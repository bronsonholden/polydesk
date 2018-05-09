const sails = require('sails');
const { describe, it } = require('mocha');
const { expect } = require('chai');

describe('Account (model)', function () {
  this.timeout(60000);

  it('helper: create-new-account', function (done) {
    sails.helpers.createNewAccount.with({
      name: 'account@polydesk.com'
    }).switch({
      success: (account) => {
        expect(account).to.exist;
        done();
      },
      error: done
    });
  });
});
