const _ = require('lodash');
const jsep = require('jsep');
const arangoDb = require('arangojs');
const BigNumber = require('bignumber.js');

module.exports = {
  friendlyName: 'Get Object Metadata Sets',
  description: 'Gets the metadata sets for an object',
  inputs: {
    account: {
      type: 'number',
      required: true,
      description: 'The account ID to create metadata for'
    },
    object: {
      type: 'number',
      required: true,
      description: 'The object ID to add metadata for'
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
      outputFriendlyName: 'Metadata Sets',
      outputDescription: 'The sets of metadata'
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

    var collectionName = sails.config.metadata.arangoDb.collection.replace('%account', inputs.account);

    const collection = db.collection(collectionName);
    var document = {
      _object: `${prefix}${inputs.object}`
    };

    async.waterfall([
      (callback) => {
        db.query(`FOR d IN \`${collectionName}\` FILTER d._object == '${prefix}${inputs.object}' RETURN d`).catch((err) => {
          callback(err);
        }).then((cursor) => {
          if (cursor) {
            return callback(null, cursor);
          }
        });
      },
      (cursor, callback) => {
        var results = [];

        cursor.each(val => results.push(val));
        callback(null, results)
      },
      (results, callback) => {
        var metadataSets = {};

        results.map((res) => {
          var set = {};

          Object.keys(res).filter(key => key.indexOf('$') === 0).forEach(key => set[key.slice(1)] = res[key]);

          metadataSets[res._set] = set;
        });

        callback(null, metadataSets);
      },
      (metadataSets, callback) => {
        try {
          var formulas = {};
          var context = {
            metadataSets: metadataSets,
            formulaResults: {},
            formulaStack: [],
            setStack: []
          }

          _.each(metadataSets, (set, setName) => {
            context.setStack.push(setName);

            _.each(set, (field, fieldName) => {
              context.formulaStack.push({
                set: setName,
                field: fieldName
              });

              // If the field is a formula that hasn't already been calculated
              if (field.type === 'F' && !_.has(context.formulaResults, [ setName, fieldName ])) {
                var result = sails.helpers.evaluateExpressionNode(jsep(field.value), context);

                // Since we did evaluated a formula, set calculated to value
                if (result) {
                  result = _.mapKeys(result, (value, key) => {
                    if (key === 'value') {
                      return 'calculated';
                    } else {
                      return key;
                    }
                  });
                }

                _.set(context.formulaResults, [ setName, fieldName ], result);
              }

              context.formulaStack.pop();
            });

            context.setStack.pop();
          });

          var result = _.mergeWith(metadataSets, context.formulaResults, (objValue, srcValue, key, object, source, stack) => {
            // Circular or invalid formulas result in null, but frontend needs a value to display
            if (!srcValue) {
              return {
                value: ''
              };
            }
          });

          callback(null, result);
        } catch (err) {
          callback(err);
        }
      }
    ], (err, metadataSets) => {
      if (err) {
        return exits.error(new Error(err.message));
      }

      exits.success(metadataSets);
    });
  }
};
