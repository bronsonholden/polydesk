const fs = require('fs');
const async = require('async');
const readline = require('readline');
const path = require('path');
const exec = require('child_process').exec;
const skipperDisk = require('skipper-disk');
const skipperS3 = require('skipper-better-s3');
const AWS = require('aws-sdk');

const sails = require('sails');

if (typeof process.env.NODE_ENV !== 'string' || process.env.NODE_ENV.indexOf('ocr-') !== 0) {
  sails.log.error(`It looks like the OCR worker wasn't executed in an appropriate environment. They are prefixed with 'ocr-<name>', e.g. 'ocr-development'. Retry the command prefixed with NODE_ENV=<your-ocr-env-here>`);
  process.exit(1);
}

sails.load({
  hooks: {
    http: false,
    sockets: false,
    views: false
  }
}, function (err, app) {
  if (err) {
    sails.log.error(err.message);
    process.exit(1);
  }

  var disk = skipperDisk();
  var s3 = skipperS3(sails.config.documents.s3);
  var shutdown = false;

  var sqs = new AWS.SQS({
    accessKeyId: sails.config.documents.sqs.key,
    secretAccessKey: sails.config.documents.sqs.secret,
    region: sails.config.documents.sqs.region
  });

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
        sqs.receiveMessage({
          QueueUrl: sails.config.documents.sqs.url,
          MaxNumberOfMessages: 1,
          WaitTimeSeconds: 20
        }, (err, data) => {
          if (err) {
            return callback(err);
          }

          callback(null, data);
        });
      },
      (data, callback) => {
        async.eachSeries(_.get(data, 'Messages'), (message, callback) => {
          sqs.deleteMessage({
            QueueUrl: sails.config.documents.sqs.url,
            ReceiptHandle: message.ReceiptHandle
          }, callback);
        }, (err) => {
          if (err) {
            return callback(err);
          }

          callback(null, data);
        });
      },
      (data, callback) => {
        var docId = _.map(_.get(data, 'Messages'), message => _.get(JSON.parse(message.Body), 'document'));

        callback(null, docId);
      },
      (files, callback) => {
        const gs = process.platform === 'win32' ? 'gswin64c' : 'gs';

        async.eachSeries(files, (file, callback) => {
          async.waterfall([
            (callback) => {
              var id = file.id;
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
              var rs = s3.read(`queue/${id}.pdf`);
              var ws = fs.createWriteStream(local);

              rs.pipe(ws);
              ws.on('finish', () => {
                callback(null, tmp, id, local);
              });
            },
            (tmp, id, local, callback) => {
              exec(`${gs} -sDEVICE=jpeg -dBATCH -dSAFER -dNOPAUSE -dDownScaleFactor=3 -r500 -q -sPAPERSIZE=a4 -sOutputFile=${tmp}/%d.jpg ${local}`, (err, stdin, stdout) => {
                if (err) {
                  return callback(err);
                }

                sails.log.info('Converted ' + local + ' to pages');
                callback(null, tmp, id);
              });
            },
            (tmp, id, callback) => {
              s3.rm(`queue/${id}.pdf`, (err, res) => {
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
                if (err) {
                  return callback(err);
                }

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

                  callback(null, tmp, id, dirname);
                });
              });
            },
            (tmp, id, dirname, callback) => {
              var local = path.join(tmp, 'document.pdf');
              var receiver = s3.receive({
                dirname: dirname
              });

              receiver.write(fs.createReadStream(local), (err) => {
                if (err) {
                  return callback(err);
                }

                sails.log.info(`Uploaded ${id} to s3://${sails.config.documents.s3.bucket}/${dirname}/`);
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
