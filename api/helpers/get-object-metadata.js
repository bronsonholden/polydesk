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

            var results = {};
            var expressions = sails.helpers.filterOutCircularFormulas(formulas, {
              maxDepth: 2
            });

            _.each(formulas, (formula, fieldName) => {
              if (!_.has(expressions, fieldName)) {
                // Circular formulas, or those removed due to referencing circular formulas, have null result
                results[fieldName] = null;
              }
            });

            var evaluateUnaryPrecision = (big, op) => {
              switch (op) {
              case '+':
                return big;
              case '-':
                return big.negated();
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

            var evaluateBinaryNumber = (lval, rval, op) => {
              switch (op) {
              case '*':
                return lval * rval;
              case '+':
                return lval + rval;
              case '-':
                return lval - rval;
              default:
                return null;
              }
            }

            var evaluateBinaryPrecision = (lval, rval, op) => {
              var res;

              lval = new BigNumber(lval.value);
              rval = new BigNumber(rval.value);

              switch (op) {
              case '*':
                res = lval.times(rval);
                break;
              case '+':
                res = lval.plus(rval);
                break;
              case '-':
                res = lval.minus(rval);
                break;
              default:
                res = lval;
                break;
              }

              return {
                type: 'P',
                value: res.toString()
              };
            }

            var evaluateExpressionNode = (node) => {
              switch (node.type) {
              case 'Literal':
                if (node.isField) {
                  return results[node.value] || set[node.value];
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

                var normalize = (operand) => {
                  switch (typeof(operand)) {
                  case 'string':
                    operand = {
                      type: 'S',
                      value: operand
                    };
                    break;
                  case 'number':
                    operand = {
                      type: 'N',
                      value: operand
                    }
                    break;
                  case 'boolean':
                    operand = {
                      type: 'B',
                      value: operand
                    }
                    break;
                  default:
                    break;
                  }

                  return operand;
                }

                // Get compatible rightvals for the current leftval
                // Get compatible leftvals for the current rightval
                // Intersect, then do some sort of preference? N op P => P or similar?
                // Call eval functions, return result.

                left = normalize(left);
                right = normalize(right);

                var fn = {
                  'N,N': evaluateBinaryNumber,
                  'N,P': evaluateBinaryPrecision,
                  'P,N': evaluateBinaryPrecision,
                  'P,P': evaluateBinaryPrecision
                };

                var spec = `${left.type},${right.type}`;

                if (fn[spec]) {
                  return fn[spec](left, right, node.operator);
                } else {
                  return null;
                }
              default:
                return null;
              }
            };

            var evaluateFormula = (fieldName, expr) => {
              // If already calculated, or removed due to being circular
              if (results.hasOwnProperty(fieldName) || !formulas[fieldName]) {
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

            _.each(results, (result, fieldName) => {
              // Could be null due to circular ref, or invalid formula
              if (result) {
                set[fieldName].calculated = result.value;
                // Mark this as a calculation so we don't override formula string
                set[fieldName].type = 'F';
              }
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
