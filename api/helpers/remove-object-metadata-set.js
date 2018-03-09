const AWS = require('aws-sdk');

module.exports = {
  friendlyName: 'Remove Object Metadata Set',
  description: 'Remove a specified set of metadata from an object, regardless of content',
  inputs: {
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
      console.log('asdf');
      return exits.invalidObjectType(new Error('The specified object type is invalid'));
    }

    var dynamoDb = new AWS.DynamoDB({
      accessKeyId: sails.config.metadata.dynamoDb.key,
      secretAccessKey: sails.config.metadata.dynamoDb.secret,
      region: 'us-west-2'
    });

    dynamoDb.deleteItem({
      TableName: sails.config.metadata.dynamoDb.table,
      Key: {
        objectUid: {
          S: `${prefix}${inputs.object}`
        },
        setName: {
          S: inputs.setName
        }
      },
      ReturnConsumedCapacity: 'TOTAL',
      ReturnValues: 'ALL_OLD'
    }, (err, data) => {
      if (err) {
        return exits.error(err);
      }

      exits.success(data);
    });
  }
};
