const arangoDb = require('arangojs');

module.exports = {
  friendlyName: 'Generate Structured View',
  description: 'Generate a list of documents described by a given structured view',
  inputs: {
    account: {
      type: 'number',
      required: true,
      description: 'The account ID to create metadata for'
    },
    view: {
      type: 'number',
      required: true,
      description: 'The structured view ID to generate'
    }
  },
  exits: {
    success: {
      outputFriendlyName: 'Document List',
      outputDescription: 'The list of documents in the given view'
    },
    error: {
      description: 'A server error occurred'
    }
  },
  fn: (inputs, exits) => {
    var db = new arangoDb.Database({
      url: sails.config.metadata.arangoDb.url
    });

    db.useDatabase(sails.config.metadata.arangoDb.database);
    db.useBasicAuth(sails.config.metadata.arangoDb.username, sails.config.metadata.arangoDb.password);

    var metadataSetsColl = sails.config.metadata.arangoDb.collection.replace('%account', inputs.account);
    var structuredViewsColl = `structured-views-${inputs.account}`;

    async.waterfall([
      (callback) => {
        db.query(`FOR view IN \`${structuredViewsColl}\` FILTER view._view == ${inputs.view} RETURN view`).then((cursor) => {
          var results = [];

          cursor.each((val) => results.push(val));

          if (results.length === 1) {
            callback(null, results[0]);
          } else {
            callback(new Error('Missing/multiple views found for ID ' + inputs.view));
          }
        }).catch(callback);
      },
      (view, callback) => {
        db.query(`FOR set IN \`${metadataSetsColl}\` FILTER ${view.filterExpression} RETURN DISTINCT set._object`).then((cursor) => {
          callback(null, cursor);
        }).catch(callback);
      }
    ], (err, cursor) => {
      if (err) {
        return exits.error(err);
      }

      var results = [];

      cursor.each((val) => results.push(val));

      exits.success(results);
    });
  }
};
