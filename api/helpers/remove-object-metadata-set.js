const arangoDb = require('arangojs');

module.exports = {
  friendlyName: 'Remove Object Metadata Set',
  description: 'Remove a specified set of metadata from an object, regardless of content',
  inputs: {
    account: {
      type: 'number',
      required: true,
      description: 'The account ID to create metadata for'
    },
    object: {
      type: 'number',
      required: true,
      description: 'The object ID to remove metadata from'
    },
    setName: {
      type: 'string',
      required: true,
      description: 'The name of the metadata set'
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
      outputDescription: 'The removed metadata set'
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

    collection.remove({
      _key: `${prefix}${inputs.object}`
    }, {
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
