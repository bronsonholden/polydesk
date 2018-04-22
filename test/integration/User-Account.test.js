const sails = require('sails');
const { describe, it, before } = require('mocha');
const { expect } = require('chai');

describe('User (model) - Account (model)', function () {
  var inputs = {};

  this.timeout(60000);

  before(function (done) {
    sails.helpers.createNewUserAndAccount.with({
      email: 'user+account+1@polydesk.com',
      password: 'password'
    }).switch({
      success: (user) => {
        inputs.user = user;
        done();
      },
      error: done
    });
  });

  before(function (done) {
    sails.helpers.createNewAccount.with({
      name: 'user+account+2@polydesk.com'
    }).switch({
      success: (account) => {
        inputs.account = account;
        done();
      },
      error: done
    });
  });

  it('helper: add-user-to-account', function (done) {
    sails.helpers.addUserToAccount.with({
      user: inputs.user.id,
      account: inputs.account.id
    }).switch({
      success: (user) => {
        expect(user).to.exist;
        done();
      },
      error: done
    });
  });
});
