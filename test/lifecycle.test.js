const sails = require('sails');
const { before, after } = require('mocha');

before(function (done) {
  this.timeout(300000);

  sails.lift({
    hooks: {
      grunt: false
    },
    log: {
      level: 'warn'
    }
  }, done);
});

after(function (done) {
  this.timeout(60000);

  sails.lower(done);
});
