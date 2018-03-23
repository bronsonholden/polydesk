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

    var collectionName = sails.config.metadata.arangoDb.setsCollection.replace('%account', inputs.account);

    const collection = db.collection(collectionName);
    var document = {};

    Object.keys(inputs.metadata).forEach((key, index) => {
      var val = inputs.metadata[key];

      switch (typeof(val)) {
      case 'string':
      case 'boolean':
      case 'number':
        document[key] = val;
        break;
      default:
        return;
      }
    });

    collection.replace({
      _key: `${prefix}${inputs.object}`
    }, document, {
      waitForSync: true,
      silent: false
    }).catch((err) => {
      exits.error(new Error(err.message));
    }).then((document) => {
      if (document) {
        exits.success(document);
      }
    });
  }
};
