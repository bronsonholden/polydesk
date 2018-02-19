const fs = require('fs');
const async = require('async');
const readline = require('readline');
const exec = require('child_process').exec;

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
  var shutdown = false;

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
    sails.log.info('Working...');
    async.waterfall([
      (callback) => {
        fs.readdir('./documents', (err, contents) => {
          if (err) {
            return callback(err);
          }

          callback(null, contents.filter((file) => {
            if (fs.lstatSync('./documents/' + file).isDirectory()) {
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
        const gs = 'gswin64c'

        async.eachSeries(pdfs, (pdf, callback) => {
          exec(`${gs} -sDEVICE=pngmonod -dBATCH -dSAFER -dNOPAUSE -dDownScaleFactor=3 -r1200 -q -sPAPERSIZE=a4 -sOutputFile=./documents/p%03d.png ./documents/${pdf}`, (err, stdin, stdout) => {
            if (err) {
              return callback(err);
            }

            sails.log.info('Converted ' + pdf + ' to pages');
            fs.unlink('./documents/' + pdf, callback);
          });
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
