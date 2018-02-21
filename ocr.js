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
    orm: false,
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
  var s3 = skipperS3(sails.config.datastores.s3);
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
        disk.ls('./.tmp/documents', (err, files) => {
          if (err) {
            return callback(err);
          }

          callback(null, files.filter((file) => {
            var ext = path.extname(file);

            if (ext !== '.pdf') {
              return false;
            }

            if (fs.lstatSync(file).isDirectory()) {
              return false;
            }

            if (file.indexOf('.pdf') < 0) {
              return false;
            }

            return true;
          }));
        });
      },
      (pdfs, callback) => {
        const gs = process.platform === 'win32' ? 'gswin64c' : 'gs';

        async.eachSeries(pdfs, (pdf, callback) => {
          async.waterfall([
            (callback) => {
              fs.mkdtemp(path.join(__dirname, '.tmp/ocr-'), callback);
            },
            (tmp, callback) => {
              exec(`${gs} -sDEVICE=pngmonod -dBATCH -dSAFER -dNOPAUSE -dDownScaleFactor=3 -r800 -q -sPAPERSIZE=a4 -sOutputFile=${tmp}/p%03d.png ${pdf}`, (err, stdin, stdout) => {
                if (err) {
                  return callback(err);
                }

                sails.log.info('Converted ' + pdf + ' to pages');
                fs.unlink(pdf, (err) => {
                  if (err) {
                    return callback(err);
                  }

                  callback(null, tmp);
                });
              });
            },
            (tmp, callback) => {
              var uid = uuidv4();
              var dirname = `documents/${uid}/pages`;
              var receiver = s3.receive({
                dirname: dirname
              });

              disk.ls(tmp, (err, pages) => {
                async.eachSeries(pages, (page, callback) => {
                  receiver.write(fs.createReadStream(page), (err) => {
                    if (err) {
                      return callback(err);
                    }

                    sails.log.info(`Uploaded page ${page} to s3://${sails.config.datastores.s3.bucket}/${dirname}/`);
                    callback();
                  });
                }, callback);
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
