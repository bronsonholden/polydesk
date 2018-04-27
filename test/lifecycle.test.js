const sails = require('sails');
const async = require('async');
const { before, after } = require('mocha');
const { exec } = require('child_process');

before(function (done) {
  this.timeout(300000);

  process.env.NODE_ENV = 'test';

  async.waterfall([
    (callback) => {
      var cmd;

      if (process.platform === 'win32') {
        cmd = 'SET PGPASSWORD=postgres& psql -U postgres -c "create database \\"polydesk-test\\";"';
      } else {
        cmd = 'PGPASSWORD=postgres psql -U postgres -c "create database \\"polydesk-test\\";"';
      }

      exec(cmd, (err, stdin, stdout) => {
        callback(err);
      });
    },
    (callback) => {
      sails.lift({
        hooks: {
          grunt: false
        },
        log: {
          level: 'warn'
        }
      }, (err) => {
        callback(err);
      });
    }
  ], done);
});

after(function (done) {
  this.timeout(300000);

  async.waterfall([
    (callback) => {
      sails.lower(callback);
    },
    (callback) => {
      var cmd;

      if (process.platform === 'win32') {
        cmd = 'SET PGPASSWORD=postgres& psql -U postgres -c "drop database \\"polydesk-test\\";"';
      } else {
        cmd = 'PGPASSWORD=postgres psql -U postgres -c "drop database \\"polydesk-test\\";"';
      }

      exec(cmd, (err, stdin, stdout) => {
        callback(err);
      });
    }
  ], done);
});
