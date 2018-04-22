const sails = require('sails');
const { describe, it, before } = require('mocha');
const { expect } = require('chai');

describe('Document (model)', function () {
  var inputs = {};

  this.timeout(60000);

  before(function (done) {
    sails.helpers.createNewAccount.with({
      name: 'document@polydesk.com'
    }).switch({
      success: (account) => {
        inputs.account = account;
        done();
      },
      error: done
    });
  });

  // This just creates a Document instance, nothing actually gets uploaded.
  it('helper: create-new-document (model)', function (done) {
    sails.helpers.createNewDocument.with({
      name: 'document',
      fileType: 'pdf',
      account: inputs.account.id
    }).switch({
      success: (document) => {
        expect(document).to.exist;
        done();
      },
      error: done
    });
  });
});
