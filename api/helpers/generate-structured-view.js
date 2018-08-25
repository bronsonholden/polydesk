const arangoDb = require('arangojs');

module.exports = {
  friendlyName: 'Generate Structured View',
  description: 'Generate a list of documents described by a given structured view',
  inputs: {
    account: {
      type: 'number',
      required: true,
      description: 'The account ID owning the structured view'
    },
    view: {
      type: 'number',
      required: true,
      description: 'The structured view ID to generate'
    },
    filter: {
      type: 'ref',
      description: 'Filter object'
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
        if (view.filterExpression) {
          db.query(`FOR set IN \`${metadataSetsColl}\` FILTER ${view.filterExpression} RETURN DISTINCT set._object`).then((cursor) => {
            var results = [];

            cursor.each((val) => results.push(val));

            view.results = results;

            callback(null, view);
          }).catch(callback);
        } else {
          var filters = [];

          filters.push(`set["$${view.fieldFilter.metadataField}"].value LIKE "${inputs.filter[view.fieldFilter.metadataField]}"`);

          if (inputs.filter) {
            Object.keys(inputs.filter).forEach((key) => {
              filters.push(`set["$${key}"].value LIKE "${inputs.filter[key]}"`);
            });
          }

          var q = `FOR set IN \`${metadataSetsColl}\` FILTER set._set == "${view.fieldFilter.metadataSet}" AND ${filters.join(' AND ')} RETURN set._object`;

          db.query(q).then((cursor) => {
            var results = [];

            cursor.each((val) => results.push(val));

            view.results = results;

            callback(null, view);
          }).catch(callback);
        }
      },
      (view, callback) => {
        sails.helpers.getStructuredViewSuperview.with({
          account: inputs.account,
          view: inputs.view
        }).switch({
          success: (superview) => {
            view.superview = superview;

            callback(null, view);
          },
          error: (err) => {
            callback(err);
          }
        });
      },
      (view, callback) => {
        sails.helpers.getStructuredViewSubviews.with({
          account: inputs.account,
          view: inputs.view,
          filter: inputs.filter
        }).switch({
          success: (subviews) => {
            view.subviews = subviews;

            callback(null, view);
          },
          error: (err) => {
            callback(err);
          }
        });
      }
    ], (err, view) => {
      if (err) {
        return exits.error(err);
      }

      view.documents = [];
      view.results.forEach((obj) => {
        if (obj[0] === 'd') {
          view.documents.push(parseInt(obj.slice(1)));
        }
      });

      exits.success(view);
    });
  }
};
