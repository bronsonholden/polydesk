const async = require('async');
const arangoDb = require('arangojs');

module.exports = {
  friendlyName: 'Generate Structured View Subviews',
  description: 'Generate a list of subviews under the given structured view',
  inputs: {
    account: {
      type: 'number',
      required: true,
      description: 'The account ID owning the structured view'
    },
    view: {
      type: 'number',
      required: true,
      description: 'The structured view ID to generate subviews for'
    },
    filter: {
      type: 'ref',
      description: 'Filter object'
    }
  },
  exits: {
    success: {
      outputFriendlyName: 'Subview List',
      outputDescription: 'The list of subviews for this structured view'
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

    const viewsCollection = db.collection(`structured-views-${inputs.account}`);
    const edgeCollection = db.edgeCollection(`structured-view-edges-${inputs.account}`);

    viewsCollection.byExample({
      _view: inputs.view
    }).then((documents) => {
      if (documents._result.length === 1) {
        return edgeCollection.inEdges(documents._result[0]._id);
      } else if (documents._result.length === 0) {
        return Promise.reject(new Error('No structured view with that ID exists'));
      } else {
        return Promise.reject(new Error('Multiple structured views with ID ' + inputs.view + ' found'));
      }
    }).then((edges) => {
      async.mapSeries(edges, (edge, callback) => {
        viewsCollection.document(edge._from).then((view) => {
          callback(null, view);
        }).catch(callback);
      }, (err, results) => {
        if (err) {
          return exits.error(err);
        }

        var views = [];

        async.eachSeries(results, (view, callback) => {
          if (view.filterExpression) {
            views.push(view);
            callback();
          } else {
            var filters = [];

            if (inputs.filter) {
              Object.keys(inputs.filter).forEach((key) => {
                filters.push(`set["$${key}"].value LIKE "${inputs.filter[key]}"`);
              });
            }

            var q = `FOR set IN \`metadata-sets-${inputs.account}\` FILTER set._set == "${view.displayName.metadataSet}" ${filters.length > 0 ? ' AND ' + filters.join(' AND ') : ''} RETURN DISTINCT set["$${view.displayName.metadataField}"].value`;

            db.query(q).then((cursor) => {
              cursor.each((val) => {
                console.log(val);
                views.push({
                  _view: view._view,
                  filter: {
                    field: view.displayName.metadataField,
                    value: val
                  }
                });
              });

              callback();
            }).catch(callback);
          }
        }, () => {
          exits.success(views);
        });
      });
    }).catch(exits.error);
  }
};
