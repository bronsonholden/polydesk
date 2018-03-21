const fs = require('fs');
const async = require('async');
const readline = require('readline');
const path = require('path');
const exec = require('child_process').exec;
const uuidv4 = require('uuid/v4');
const skipperDisk = require('skipper-disk');
const skipperS3 = require('skipper-better-s3');

require('sails').load({
  hooks: {
    blueprints: false,
    controllers: false,
    cors: false,
    csrf: false,
    grunt: false,
    helpers: false,
    http: false,
    i18n: false,
    logger: false,
    orm: true,
    policies: false,
    pubsub: false,
    request: false,
    responses: false,
    session: false,
    sockets: false,
    views: false
  }
}, function (err, app) {
  var disk = skipperDisk();
  var s3 = skipperS3(sails.config.documents.s3);
  var shutdown = false;

  if (!fs.existsSync('./.tmp/documents')) {
    fs.mkdirSync('./.tmp/documents');
  }

  if (process.platform === 'win32') {
    var rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.on('SIGINT', () => {
      process.emit('SIGINT');
    });
  }

  process.on('SIGINT', () => {
    sails.log.info('OCR worker caught CTRL+C, shutting down');
    shutdown = true;
  });

  async.until(() => {
    return shutdown === true;
  }, (callback) => {
    async.waterfall([
      (callback) => {
        s3.ls('queue/', (err, files) => {
          if (err) {
            return callback(err);
          }

          callback(null, files.slice(1));
        });
      },
      (files, callback) => {
        const gs = process.platform === 'win32' ? 'gswin64c' : 'gs';

        async.eachSeries(files, (file, callback) => {
          async.waterfall([
            (callback) => {
              var id = path.basename(file, '.pdf');
              var tmp = path.join(__dirname, `.tmp/ocr-${id}`);

              fs.mkdir(tmp, (err) => {
                if (err) {
                  return callback(err);
                }

                callback(null, tmp, id);
              });
            },
            (tmp, id, callback) => {
              var local = path.join(tmp, 'document.pdf');
              var rs = s3.read(file);
              var ws = fs.createWriteStream(local);

              rs.pipe(ws);
              ws.on('finish', () => {
                callback(null, tmp, id, local);
              });
            },
            (tmp, id, local, callback) => {
              exec(`${gs} -sDEVICE=jpeg -dBATCH -dSAFER -dNOPAUSE -dDownScaleFactor=3 -r900 -q -sPAPERSIZE=a4 -sOutputFile=${tmp}/%d.jpg ${local}`, (err, stdin, stdout) => {
                if (err) {
                  return callback(err);
                }

                sails.log.info('Converted ' + local + ' to pages');
                callback(null, tmp, id);
              });
            },
            (tmp, id, callback) => {
              s3.rm(file, (err, res) => {
                if (err) {
                  return callback(err);
                }

                callback(null, tmp, id);
              });
            },
            (tmp, id, callback) => {
              var dirname = `documents/${id}`;
              var receiver = s3.receive({
                dirname: dirname + '/pages'
              });

              disk.ls(tmp, (err, pages) => {
                async.eachSeries(pages.filter(page => path.extname(page) === '.jpg'), (page, callback) => {
                  receiver.write(fs.createReadStream(page), (err) => {
                    if (err) {
                      return callback(err);
                    }

                    sails.log.info(`Uploaded page ${page} to s3://${sails.config.documents.s3.bucket}/${dirname}/`);
                    callback();
                  });
                }, (err) => {
                  if (err) {
                    return callback(err);
                  }

                  callback(null, tmp, dirname);
                });
              });
            },
            (tmp, dirname, callback) => {
              var local = path.join(tmp, 'document.pdf');
              var receiver = s3.receive({
                dirname: dirname
              });

              receiver.write(fs.createReadStream(local), (err) => {
                if (err) {
                  return callback(err)
                }

                callback(null, tmp);
              });
            },
            (tmp, callback) => {
              fs.readdir(tmp, (err, list) => {
                callback(err, tmp, list);
              });
            },
            (tmp, list, callback) => {
              async.eachSeries(list, (file, callback) => {
                fs.unlink(path.join(tmp, file), (err) => {
                  if (err) {
                    return callback(err);
                  }

                  callback();
                });
              }, (err) => {
                callback(err, tmp);
              });
            },
            (tmp, callback) => {
              fs.rmdir(tmp, (err) => {
                if (err) {
                  return callback(err);
                }

                callback();
              });
            }
          ], callback);
        }, callback);
      },
      (callback) => {
        setTimeout(callback, 1000);
      }
    ], callback);
  }, (err) => {
    var code = 0;

    if (err) {
      sails.log.error(err);
      code = 1;
    }

    process.exit(code);
  });
});
