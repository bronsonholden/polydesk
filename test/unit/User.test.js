const sails = require('sails');
const { describe, it } = require('mocha');
const { expect } = require('chai');

describe('User (model)', function () {
  this.timeout(60000);

  it('helper: create-new-user-and-account', function (done) {
    sails.helpers.createNewUserAndAccount.with({
      email: 'user+1@polydesk.com',
      password: 'password'
    }).switch({
      success: (user) => {
        done();
      },
      error: done
    });
  });

  it('hashes password', function (done) {
    sails.helpers.createNewUserAndAccount.with({
      email: 'user+2@polydesk.com',
      password: 'password'
    }).switch({
      success: (user) => {
        expect(user.password).to.not.equal('password');
        done();
      },
      error: done
    });
  });

  it('password hash returned from get', function (done) {
    sails.helpers.createNewUserAndAccount.with({
      email: 'user+3@polydesk.com',
      password: 'password'
    }).switch({
      success: (user) => {
        // TODO: find-user helper
        User.findOne({
          id: user.id
        }).exec((err, user) => {
          expect(err).to.not.exist;
          expect(user).to.exist;
          expect(user.password).to.not.equal('password');
          done();
        });
      },
      error: done
    });
  });
});
