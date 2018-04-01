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

          // Populate formulas with any metadata field that is a formula
          Object.keys(metadataSets).forEach((setName) => {
            var set = metadataSets[setName];

            Object.keys(set).forEach((fieldName) => {
              if (set[fieldName].type === 'F') {
                formulas[fieldName] = set[fieldName].value;
              }
            });

            // Formula tree for whole metadata set
            var expressions = {};

            // For each formula, build a list of other columns it references.
            // Then we try to detect circular references
            Object.keys(formulas).forEach((fieldName) => {
              var refs = [];
              var expr = jsep(formulas[fieldName]);

              var fn = (depth, node) => {
                // Max depth of 2 for now
                if (depth > 2) {
                  throw new Error('Maximum formula depth exceeded: ' + depth);
                }

                // If a field identifier
                if (node.raw && node.type === 'Literal' && node.raw[0] === '"' && node.raw.slice(-1) === '"') {
                  node.isField = true;
                  refs.push(node.value);
                }

                // For unary expressions
                if (node.argument) {
                  fn(depth + 1, node.argument);
                }

                // For binary expressions
                if (node.left && node.right) {
                  fn(depth + 1, node.left);
                  fn(depth + 1, node.right);
                }
              }

              // Save expression for later, when we do calculations
              expressions[fieldName] = expr;
              fn(1, expr);

              // Map formula field name to array of field names it references
              formulas[fieldName] = refs;
            });

            var remove = {};

            // Now check for circular references
            _.each(formulas, (val, key) => {
              var circ = _.intersection(val, _.keys(formulas));

              if (circ.length > 0) {
                // Remove circular formulas (don't calculate them)
                delete formulas[val];
                delete formulas[key];
                delete expressions[val];
                delete expressions[key];

                sails.log.warn('Circular reference found in formula');
              }
            });

            var results = {};

            var evaluateUnaryPrecision = (big, op) => {
              switch (op) {
              case '+':
                return value;
              case '-':
                return big.megated();
              }
            }

            var evaluateUnaryNumber = (value, op) => {
              switch (op) {
              case '+':
                return value;
              case '-':
                return -value;
              }
            }

            var evaluateExpressionNode = (node) => {
              switch (node.type) {
              case 'Literal':
                if (node.isField) {
                  return set[node.value];
                } else {
                  return node.value;
                }
              case 'UnaryExpression':
                if (node.argument.isField) {
                  var field = set[node.argument.value];

                  switch (field.type) {
                  case 'N':
                    return evaluateUnaryNumber(field.value, node.operator);
                  case 'P':
                    return evaluateUnaryPrecision(field.value, node.operator);
                  default:
                    return null;
                  }
                } else {
                  var value = node.argument.value;

                  switch (typeof(value)) {
                  case 'number':
                    return evaluateUnaryNumber(field.value, node.operator);
                  default:
                    return null;
                  }
                }
                break;
              case 'BinaryExpression':
                var left = evaluateExpressionNode(node.left);
                var right = evaluateExpressionNode(node.right);

                // Get compatible rightvals for the current leftval
                // Get compatible leftvals for the current rightval
                // Intersect, then do some sort of preference? N op P => P or similar?
                // Call eval functions, return result.
                return null;
              default:
                return null;
              }
            };

            var evaluateFormula = (fieldName, expr) => {
              // If already calculated, or removed due to being circular
              if (results[fieldName] || !formulas[fieldName]) {
                return;
              }

              // Evaluate all referenced formulas
              _.each(formulas[fieldName], (ref) => {
                evaluateFormula(ref, expressions[ref]);
              });

              results[fieldName] = evaluateExpressionNode(expr);
            };

            _.each(expressions, (expr, fieldName) => {
              evaluateFormula(fieldName, expr);
            });
          });

          callback(null, metadataSets);
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
