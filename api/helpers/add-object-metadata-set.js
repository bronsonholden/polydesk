const arangoDb = require('arangojs');
const BigNumber = require('bignumber.js');

module.exports = {
  friendlyName: 'Add Object Metadata Set',
  description: 'Adds a new metadata set for an object, removing any fields not present in the new set',
  inputs: {
    account: {
      type: 'number',
      required: true,
      description: 'The account ID to create metadata for'
    },
    object: {
      type: 'number',
      required: true,
      description: 'The object ID to add metadata for'
    },
    setName: {
      type: 'string',
      required: true,
      description: 'The name of the metadata set'
    },
    order: {
      type: 'number',
      required: true,
      description: 'The ordering of the metadata set'
    },
    metadata: {
      type: 'json',
      required: true,
      description: 'The metadata to add to the object'
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
      outputDescription: 'The added set of metadata'
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
      _set: inputs.setName,
      _order: inputs.order
    };

    Object.keys(inputs.metadata).forEach((key, index) => {
      var val = inputs.metadata[key];

      // TODO: D.R.Y.
      switch (val.type) {
      case 'S':
        document['$' + key] = {
          type: 'S',
          value: val.value,
          order: val.order
        };
        break;
      case 'B':
        document['$' + key] = {
          type: 'B',
          value: val.value === 'true' ? true : false,
          order: val.order
        };
        break;
      case 'N':
        try {
          var big = new BigNumber(val.value);
          var n = big.toNumber();

          document['$' + key] = {
            type: 'N',
            value: n,
            order: val.order
          };
        } catch (err) {
          document['$' + key] = {
            type: 'N',
            value: 0,
            order: val.order
          };
        }
        break;
      case 'P':
        try {
          var big = new BigNumber(val.value);

          document['$' + key] = {
            type: 'P',
            value: val.value,
            order: val.order
          };
        } catch (err) {
          document['$' + key] = {
            type: 'P',
            value: '0',
            order: val.order
          };
        }
        break;
      case 'F':
        document['$' + key] = {
          type: 'F',
          value: val.value,
          order: val.order
        };
        break;
      case 'NL':
        try {
          document['$' + key] = {
            type: 'NL',
            value: val.value.map((n) => {
              var big = new BigNumber(n);
              return big.toNumber();
            }),
            order: val.order
          };
        } catch (err) {
          document['$' + key] = {
            type: 'NL',
            value: [],
            order: val.order
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
            collection.replace(doc, document, {
              waitForSync: true,
              silent: false
            }).catch((err) => {
              callback(err);
            }).then((document) => {
              if (document) {
                callback(null, document);
              }
            });
          }, (err) => {
            callback(err, document);
          });
        } else {
          collection.save(document, {
            waitForSync: true,
            silent: false
          }).catch((err) => {
            callback(err);
          }).then((res) => {
            if (res) {
              callback(null, document);
            }
          });
        }
      }
    ], (err, document) => {
      if (err) {
        return exits.error(new Error(err.message));
      }

      exits.success(document);
    });
  }
};
