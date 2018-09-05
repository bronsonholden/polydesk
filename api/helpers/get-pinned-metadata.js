const arangoDb = require('arangojs');

module.exports = {
  friendlyName: 'Get Pinned Metadata',
  description: 'Get pinned metadata for a document',
  inputs: {
    account: {
      type: 'number',
      required: true
    },
    user: {
      type: 'number',
      required: true
    },
    document: {
      type: 'number',
      required: true
    }
  },
  exits: {
    success: {
      outputFriendlyName: 'Pinned Metadata',
      outputDescription: 'The pinned metadata for the document'
    },
    error: {
      description: 'A server error occurred'
    }
  },
  fn: (inputs, exits) => {
    async.waterfall([
      (callback) => {
        sails.helpers.getObjectMetadata.with({
          account: inputs.account,
          object: inputs.document,
          objectType: 'document'
        }).switch({
          success: (metadataSets) => {
            callback(null, metadataSets);
          },
          error: (err) => {
            callback(err);
          },
          invalidObjectType: (err) => {
            callback(err);
          }
        });
      },
      (metadataSets, callback) => {
        var db = new arangoDb.Database({
          url: sails.config.metadata.arangoDb.url
        });

        db.useDatabase(sails.config.metadata.arangoDb.database);
        db.useBasicAuth(sails.config.metadata.arangoDb.username, sails.config.metadata.arangoDb.password);

        const collection = db.collection(`metadata-pins-${inputs.account}`);

        var query = `FOR pin IN \`metadata-pins-${inputs.account}\` FILTER pin.user == ${inputs.user} RETURN pin`;

        db.query(query).then((cursor) => {
          var pins = {};

          cursor.each(val => {
            pins[val.metadataSet] = val.metadataFields;
          });

          callback(null, metadataSets, pins);

        }).catch(exits.error);
      },
      (metadataSets, pins, callback) => {
        _.forEach(_.keys(metadataSets), (set) => {
          if (!_.has(pins, set)) {
            delete metadataSets[set];
            return;
          }

          _.forEach(_.keys(metadataSets[set].fields), (field) => {
            if (pins[set].indexOf(field) < 0) {
              delete metadataSets[set].fields[field];
            }
          });
        });

        callback(null, metadataSets);
      }
    ], (err, pinnedMetadata) => {
      if (err) {
        return callback(err);
      }

      exits.success(pinnedMetadata);
    });
  }
};
