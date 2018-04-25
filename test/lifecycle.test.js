const sails = require('sails');
const async = require('async');
const arangoDb = require('arangojs');
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
    },
    (callback) => {
      var db = new arangoDb.Database({
        url: sails.config.metadata.arangoDb.url
      });

      db.useBasicAuth(sails.config.metadata.arangoDb.username, sails.config.metadata.arangoDb.password);
      db.createDatabase(sails.config.metadata.arangoDb.database, [
        {
          username: 'root'
        }
      ]).then((info) => {
        callback();
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
      var db = new arangoDb.Database({
        url: sails.config.metadata.arangoDb.url
      });

      db.useBasicAuth(sails.config.metadata.arangoDb.username, sails.config.metadata.arangoDb.password);
      db.dropDatabase(sails.config.metadata.arangoDb.database).then((info) => {
        callback();
      }, (err) => {
        if (err) {
          console.log(err.message);
        }

        callback();
      });
    },
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
