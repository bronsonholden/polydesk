const sails = require('sails');

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
