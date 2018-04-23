const sails = require('sails');
const async = require('async');
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

  it('helper: add-object-metadata-set', function (done) {
    async.waterfall([
      (callback) => {
        sails.helpers.createNewDocument.with({
          name: 'document+add-object-metadata-set',
          fileType: 'pdf',
          account: inputs.account.id
        }).switch({
          success: (document) => {
            expect(document).to.exist;
            callback(null, document);
          },
          error: callback
        })
      },
      (document, callback) => {
        sails.helpers.addObjectMetadataSet.with({
          account: inputs.account.id,
          object: document.id,
          setName: 'Set #1',
          order: 0,
          metadata: {
            'Field #1': {
              type: 'N',
              order: 0,
              value: '15.2'
            },
            'Field #2': {
              type: 'B',
              order: 1,
              value: true
            }
          },
          objectType: 'document'
        }).switch({
          success: (metadataSet) => {
            expect(metadataSet).to.exist;
            callback();
          },
          error: callback
        });
      }
    ], done);
  });
});
