const arangoDb = require('arangojs');

module.exports = {
  friendlyName: 'Generate Root Structured Views',
  description: 'Retrieve all top-level structured views',
  inputs: {
    account: {
      type: 'number',
      required: true,
      description: 'The account ID owning the structured view'
    }
  },
  exits: {
    success: {
      outputFriendlyName: 'Root views',
      outputDescription: 'Array of root structured views'
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

    db.query(
      `FOR view IN \`structured-views-${inputs.account}\`
      FILTER view._id NOT IN (
        FOR edge IN \`structured-view-edges-${inputs.account}\` RETURN DISTINCT edge._from
      ) RETURN view`
    ).then((cursor) => {
      var results = [];

      cursor.each((val) => results.push(val));

      exits.success(results);
    }).catch(exits.error);
  }
};
