const jsep = require('jsep');

module.exports = {
  friendlyName: 'Filter Out Circular Formulas',
  description: 'Generate expression trees for all formulas that are both non-circular and do not reference circular formulas',
  sync: true,
  inputs: {
    formulas: {
      type: 'ref',
      required: true
    },
    config: {
      type: 'ref'
    }
  },
  exits: {
    success: {
      outputFriendlyName: 'Expression Tree Dictionary',
      outputDescription: 'Dictionary of all expression trees for non-circular formulas'
    }
  },
  fn: (inputs, exits) => {
    // Dictionary of all formula references by field name
    var formulaReferences = {};
    // Dictionary of all formula expression trees by field name
    var expressions = {};
    var config = inputs.config || {};
    var maxDepth = config.maxDepth || 2;

    // Build map of formula names to list of field names it references
    _.each(inputs.formulas, (formula, fieldName) => {
      var refs = [];
      var expr = jsep(formula);

      var fn = (depth, node) => {
        if (depth > maxDepth) {
          throw new Error('Maximum formula depth exceeded: ' + depth);
        }

        // If a field identifier
        if (node.raw && node.type === 'Literal' && node.raw[0] === '"' && node.raw.slice(-1) === '"') {
          node.isField = true; // Mark this node as a metadata field. TODO: Lookup in metadata set instead of modifying expr?
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
      };

      // Save expression tree
      expressions[fieldName] = expr;
      formulaReferences[fieldName] = refs;

      fn(1, expr);
    });

    // Now check for circular references
    _.each(formulaReferences, (refs, fieldName) => {
      _.each(refs, (otherFieldName) => {
        var other = formulaReferences[otherFieldName];

        if (other && other.indexOf(fieldName) > -1) {
          // Remove expressions
          delete expressions[fieldName];
          delete expressions[otherFieldName];

          sails.log.warn(`Circular reference found: ${fieldName} <=> ${otherFieldName}`);
        }
      });
    });

    exits.success(expressions);
  }
};
