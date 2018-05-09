const sails = require('sails');
const async = require('async');
const { describe, it, before } = require('mocha');
const { expect } = require('chai');

describe('Document (model)', function () {
  var inputs = {};

  this.timeout(5000);

  before(function (done) {
    sails.helpers.createNewAccount.with({
      name: 'document@polydesk.com'
    }).switch({
      success: (account) => {
        expect(account).to.exist;
        expect(account.name).to.equal('document@polydesk.com');
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
        expect(document.name).to.equal('document');
        expect(document.fileType).to.equal('pdf');
        expect(document.account).to.equal(inputs.account.id);
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
        });
      },
      (document, callback) => {
        sails.helpers.addObjectMetadataSet.with({
          account: inputs.account.id,
          object: document.id,
          setName: 'Set #1',
          order: 0,
          metadata: {
            'NumberField': {
              type: 'N',
              order: 0,
              value: 15.2
            },
            'BoolField': {
              type: 'B',
              order: 1,
              value: true
            }
          },
          objectType: 'document'
        }).switch({
          success: (metadataSet) => {
            expect(metadataSet).to.exist;
            expect(metadataSet._order).to.equal(0);
            expect(metadataSet._object).to.equal(`d${document.id}`);
            expect(metadataSet._set).to.equal('Set #1');
            expect(metadataSet['$NumberField']).to.exist;
            expect(metadataSet['$BoolField']).to.exist;
            expect(metadataSet['$NumberField'].value).to.equal(15.2);
            expect(metadataSet['$BoolField'].value).to.equal(true);
            callback();
          },
          error: callback
        });
      }
    ], done);
  });

  it('helper: update-object-metadata-set (existing)', function (done) {
    async.waterfall([
      (callback) => {
        sails.helpers.createNewDocument.with({
          name: 'document+update-object-metadata-set',
          fileType: 'pdf',
          account: inputs.account.id
        }).switch({
          success: (document) => {
            expect(document).to.exist;
            callback(null, document);
          },
          error: callback
        });
      },
      (document, callback) => {
        sails.helpers.addObjectMetadataSet.with({
          account: inputs.account.id,
          object: document.id,
          setName: 'Set #2',
          order: 0,
          metadata: {
            'NumberField': {
              type: 'N',
              order: 0,
              value: 10
            },
            'BoolField': {
              type: 'B',
              order: 1,
              value: true
            }
          },
          objectType: 'document'
        }).switch({
          success: (metadataSet) => {
            expect(metadataSet).to.exist;
            expect(metadataSet._order).to.equal(0);
            expect(metadataSet._object).to.equal(`d${document.id}`);
            expect(metadataSet._set).to.equal('Set #2');
            expect(metadataSet['$NumberField']).to.exist;
            expect(metadataSet['$BoolField']).to.exist;
            expect(metadataSet['$NumberField'].value).to.equal(10);
            expect(metadataSet['$BoolField'].value).to.equal(true);
            callback(null, document);
          },
          error: callback
        });
      },
      (document, callback) => {
        sails.helpers.updateObjectMetadataSet.with({
          account: inputs.account.id,
          object: document.id,
          setName: 'Set #2',
          order: 0,
          metadata: {
            'NumberField': {
              type: 'N',
              order: 0,
              value: 20
            },
            'BoolField': {
              type: 'B',
              order: 1,
              value: false
            },
            'StringField': {
              type: 'S',
              order: 2,
              value: 'The quick brown fox'
            }
          },
          objectType: 'document'
        }).switch({
          success: (metadataSet) => {
            expect(metadataSet).to.exist;
            expect(metadataSet._order).to.equal(0);
            expect(metadataSet._object).to.equal(`d${document.id}`);
            expect(metadataSet._set).to.equal('Set #2');
            expect(metadataSet['$NumberField']).to.exist;
            expect(metadataSet['$BoolField']).to.exist;
            expect(metadataSet['$StringField']).to.exist;
            expect(metadataSet['$NumberField'].value).to.equal(20);
            expect(metadataSet['$BoolField'].value).to.equal(false);
            expect(metadataSet['$StringField'].value).to.equal('The quick brown fox');
            callback();
          },
          error: callback
        });
      }
    ], done);
  });
});
