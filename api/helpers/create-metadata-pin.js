const arangoDb = require('arangojs');

module.exports = {
  friendlyName: 'Create Metadata Pin',
  description: 'Create a metadata pin configuration for a user',
  inputs: {
    account: {
      type: 'number',
      required: true
    },
    user: {
      type: 'number',
      required: true
    },
    metadataSet: {
      type: 'string',
      required: true
    },
    metadataFields: {
      type: 'ref',
      required: true
    },
    showNull: {
      type: 'boolean',
      defaultsTo: true
    }
  },
  exits: {
    success: {
      outputFriendlyName: 'Metadata Pin',
      outputDescription: 'Created metadata pin object'
    },
    error: {
      outputDescription: 'A server error occurred'
    }
  },
  fn: (inputs, exits) => {
    var db = new arangoDb.Database({
      url: sails.config.metadata.arangoDb.url
    });

    db.useDatabase(sails.config.metadata.arangoDb.database);
    db.useBasicAuth(sails.config.metadata.arangoDb.username, sails.config.metadata.arangoDb.password);

    const collection = db.collection(`metadata-pins-${inputs.account}`);

    collection.create({
      user: inputs.user,
      metadataSet: inputs.metadataSet,
      metadataFields: inputs.metadataFields
    }).then((pin) => {
      exits.success(pin);
    }).catch(exits.error);
  }
};
