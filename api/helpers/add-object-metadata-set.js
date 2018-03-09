const AWS = require('aws-sdk');

module.exports = {
  friendlyName: 'Add Object Metadata Set',
  description: 'Adds a new metadata set for an object, removing any fields not present in the new set',
  inputs: {
    object: {
      type: 'number',
      required: true,
      description: 'The object ID to add metadata for'
    },
    setName: {
      type: 'string',
      required: true,
      description: 'The name of the metadata set'
    },
    metadata: {
      type: 'json',
      required: true,
      description: 'The metadata to add to the object'
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
      outputDescription: 'The added set of metadata'
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

    var dynamoDb = new AWS.DynamoDB({
      accessKeyId: sails.config.metadata.dynamoDb.key,
      secretAccessKey: sails.config.metadata.dynamoDb.secret,
      region: 'us-west-2'
    });

    var item = {
      objectUid: {
        S: `${prefix}${inputs.object}`
      },
      setName: {
        S: inputs.setName
      }
    };

    Object.keys(inputs.metadata).map((key, idx) => {
      if (typeof(key) === 'string') {
        var dkey = '#' + key;
        var val = inputs.metadata[key];

        switch (typeof(val)) {
        case 'string':
          item['$' + key] = {
            S: val
          };
          break;
        case 'boolean':
          item['$' + key] = {
            BOOL: val
          };
          break;
        case 'number':
          item['$' + key] = {
            N: `${val}`
          };
          break;
        default:
          break;
        }
      }
    });

    dynamoDb.putItem({
      TableName: sails.config.metadata.dynamoDb.table,
      Item: item,
      ReturnConsumedCapacity: 'TOTAL'
    }, (err, data) => {
      if (err) {
        return exits.error(err);
      }

      exits.success(inputs.metadata);
    });
  }
};
