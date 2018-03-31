const arangoDb = require('arangojs');

module.exports = {
  friendlyName: 'Update Object Metadata Set',
  description: 'Updates a set of metadata for an object, leaving unspecified attributes unchanged and adding any new ones',
  inputs: {
    account: {
      type: 'number',
      required: true,
      description: 'The account ID to create metadata for'
    },
    object: {
      type: 'number',
      required: true,
      description: 'The object ID to update metadata for'
    },
    setName: {
      type: 'string',
      required: true,
      description: 'The name of the metadata set'
    },
    metadata: {
      type: 'json',
      required: true,
      description: 'The metadata to update for the object'
    },
    objectType: {
      type: 'string',
      required: true,
      isIn: [
        'document',
        'folder'
      ]
    }
  },
  exits: {
    success: {
      outputFriendlyName: 'Metadata Set',
      outputDescription: 'The updated metadata set'
    },
    error: {
      description: 'A server error occurred'
    },
    invalidObjectType: {
      description: 'The specified object type is invalid'
    }
  },
  fn: (inputs, exits) => {
    var prefix;

    switch (inputs.objectType) {
    case 'document':
      prefix = 'd';
      break;
    case 'folder':
      prefix = 'f';
      break;
    default:
      return exits.invalidObjectType(new Error('The specified object type is invalid'));
    }

    var db = new arangoDb.Database({
      url: sails.config.metadata.arangoDb.url
    });

    db.useDatabase(sails.config.metadata.arangoDb.database);
    db.useBasicAuth(sails.config.metadata.arangoDb.username, sails.config.metadata.arangoDb.password);

    var collectionName = sails.config.metadata.arangoDb.collection.replace('%account', inputs.account);

    const collection = db.collection(collectionName);
    var document = {
      _object: `${prefix}${inputs.object}`,
      _set: inputs.setName
    };

    Object.keys(inputs.metadata).forEach((key, index) => {
      var val = inputs.metadata[key];

      // TODO: D.R.Y.
      switch (val.type) {
      case 'S':
        document['$' + key] = {
          type: 'S',
          value: val.value
        };
        break;
      case 'B':
        document['$' + key] = {
          type: 'B',
          value: val.value === 'true' ? true : false
        };
        break;
      case 'N':
        try {
          var big = new BigNumber(val.value);
          var n = big.toNumber();

          document['$' + key] = {
            type: 'N',
            value: n
          };
        } catch (err) {
          document['$' + key] = {
            type: 'N',
            value: 0
          };
        }
        break;
      default:
        return;
      }
    });

    async.waterfall([
      (callback) => {
        collection.byExample({
          _object: `${prefix}${inputs.object}`,
          _set: inputs.setName
        }).catch((err) => {
          callback(err);
        }).then((cursor) => {
          callback(null, cursor);
        });
      },
      (cursor, callback) => {
        if (cursor.hasNext()) {
          var documents = [];

          cursor.each(v => documents.push(v));

          async.eachSeries(documents, (doc, callback) => {
            collection.update(doc, document, {
              waitForSync: true,
              silent: false
            }).catch((err) => {
              callback(err);
            }).then((document) => {
              if (document) {
                callback(null, document);
              }
            });
          }, callback);
        } else {
          collection.save(document, {
            waitForSync: true,
            silent: false
          }).catch((err) => {
            callback(err);
          }).then((document) => {
            if (document) {
              callback(null, document);
            }
          });
        }
      }
    ], (err) => {
      if (err) {
        return exits.error(new Error(err.message));
      }

      exits.success(document);
    });
  }
};
