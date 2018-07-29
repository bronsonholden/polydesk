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
        return Promise.reject('No structured view with that ID exists');
      } else {
        return Promise.reject('Multiple structured views with ID ' + inputs.view + ' found');
      }
    }).then((edges) => {
      async.mapSeries(edges, (edge, callback) => {
        viewsCollection.document(edge._from).then((view) => {
          callback(null, view);
        }).catch(callback);
      }, (err, subviews) => {
        if (err) {
          return exits.error(err);
        }

        exits.success(subviews);
      });
    }).catch(exits.error);
  }
};
