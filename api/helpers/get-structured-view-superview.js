const arangoDb = require('arangojs');

module.exports = {
  friendlyName: 'Generate Structured View Superview',
  description: 'Retrieve the superview of the given structured view',
  inputs: {
    account: {
      type: 'number',
      required: true,
      description: 'The account ID owning the structured view'
    },
    view: {
      type: 'number',
      required: true,
      description: 'The structured view ID to retrieve the superview for'
    }
  },
  exits: {
    success: {
      outputFriendlyName: 'Superview',
      outputDescription: 'The superview of the given structured view'
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
        return edgeCollection.outEdges(documents._result[0]._id);
      } else if (documents._result.length === 0) {
        return Promise.reject('No structured view with that ID exists');
      } else {
        return Promise.reject('Multiple structured views with ID ' + inputs.view + ' found');
      }
    }).then((edges) => {
      if (edges.length === 1) {
        return viewsCollection.document(edges[0]._to);
      } else {
        return Promise.resolve(null);
      }
    }).then(exits.success).catch(exits.error);
  }
};
