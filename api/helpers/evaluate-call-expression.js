const jsep = require('jsep');

module.exports = {
  friendlyName: 'Evaluate Binary Number',
  description: 'Evaluates a binary operation on two native number metadata values',
  sync: true,
  inputs: {
    callee: {
      type: 'string',
      required: true,
      enum: [
        'field'
      ]
    },
    arguments: {
      type: 'ref',
      required: true
    },
    context: {
      type: 'ref',
      required: true
    }
  },
  exits: {
    success: {
      outputFriendlyName: 'Operation Result',
      outputDescription: 'Result of the operation'
    }
  },
  fn: (inputs, exits) => {
    switch (inputs.callee) {
    case 'field':
      var field, set;

      if (inputs.arguments.length === 1) {
        field = inputs.arguments[0].value;
        set = _.last(inputs.context.setStack);
      } else if (inputs.arguments.length === 2) {
        set = inputs.arguments[0].value;
        field = inputs.arguments[1].value;
      } else {
        return exits.success({
          err: 'Invalid function arguments'
        });
      }

      if (typeof(field) !== 'string' || typeof(set) !== 'string') {
        return exits.success({
          err: 'Invalid field specification'
        });
      }

      var circular = false;

      _.each(inputs.context.formulaStack, (val) => {
        if (val.field === field && val.set === set) {
          circular = true;
          return false;
        }
      });

      if (circular) {
        return exits.success({
          err: 'Circula formula'
        });
      }

      var value = _.get(inputs.context.metadataSets, [ set, field ]);

      if (!value) {
        return exits.success({
          err: `Invalid metadata field <${set}, ${field}>`
        });
      }

      // If not a formula, just return the value
      if (value.type !== 'F') {
        return exits.success(value);
      }

      // If not already calculated, do so
      if (!_.has(inputs.context.formulaResults, [ set, field ])) {
        inputs.context.setStack.push(set);
        inputs.context.formulaStack.push({
          set: set,
          field: field
        });

        var result = sails.helpers.evaluateExpressionNode(jsep(inputs.context.metadataSets[set][field].value), inputs.context);
        inputs.context.setStack.pop();
        inputs.context.formulaStack.pop();

        if (result) {
          _.set(inputs.context.formulaResults, [ set, field ], result);
        }

        return exits.success(result);
      } else {
        return exits.success(_.get(inputs.context.formulaResults, [ set, field ]));
      }
    case 'sum':
      var operands = _.map(inputs.arguments, (arg) => {
        var result = sails.helpers.evaluateExpressionNode(arg, inputs.context);

        if (!result || result.err) {
          return result;
        }

        switch (result.type) {
        case 'NL':
          return sails.helpers.normalizeFormulaOperand(_.reduce(result.value, (sum, n) => sum + n, 0));
        case 'N':
          return result;
        default:
          return {
            err: 'Invalid operand for function sum'
          };
        }
      });

      var total = _.reduce(operands, (total, operand) => {
        if (total.err) {
          return total;
        }

        if (operand.err) {
          return {
            err: operand.err
          };
        }

        return sails.helpers.evaluateBinaryNumber(total, operand, '+');
      }, sails.helpers.normalizeFormulaOperand(0));

      return exits.success(total);
    default:
      return exits.success({
        err: 'Unknown function ' + inputs.callee
      });
    }
  }
};
