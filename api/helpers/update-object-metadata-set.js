const AWS = require('aws-sdk');

module.exports = {
  friendlyName: 'Update Object Metadata Set',
  description: 'Updates a set of metadata for an object, leaving unspecified attributes unchanged and adding any new ones',
  inputs: {
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

    var dynamoDb = new AWS.DynamoDB({
      accessKeyId: sails.config.metadata.dynamoDb.key,
      secretAccessKey: sails.config.metadata.dynamoDb.secret,
      region: 'us-west-2'
    });

    var expressions = [ ];
    var names = { };
    var values = { };

    Object.keys(inputs.metadata).map((key, idx) => {
      if (typeof(key) === 'string') {
        var dkey = '#' + key;
        var val = inputs.metadata[key];

        names['#' + key] = `$${key}`;

        switch (typeof(val)) {
        case 'string':
          values[':' + key] = {
            S: val
          };
          break;
        case 'boolean':
          values[':' + key] = {
            BOOL: val
          };
          break;
        case 'number':
          values[':' + key] = {
            N: `${val}`
          };
          break;
        default:
          return;
        }

        expressions.push(`#${key} = :${key}`);
      }
    });

    dynamoDb.updateItem({
      TableName: sails.config.metadata.dynamoDb.table,
      Key: {
        objectUid: {
          S: `${prefix}${inputs.object}`
        },
        setName: {
          S: inputs.setName
        }
      },
      UpdateExpression: 'SET ' + expressions.join(', '),
      ExpressionAttributeNames: names,
      ExpressionAttributeValues: values,
      ReturnValues: 'ALL_NEW'
    }, (err, data) => {
      if (err) {
        return exits.error(err);
      }

      exits.success(data);
    });
  }
};
