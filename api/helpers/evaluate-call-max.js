const BigNumber = require('bignumber.js');

module.exports = {
  friendlyName: 'Evaluate Call Expression: max()',
  description: 'Evaluates a formula function call: max()',
  sync: true,
  inputs: {
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
    var operands = _.map(inputs.arguments, (arg) => {
      var result = sails.helpers.evaluateExpressionNode(arg, inputs.context);

      if (!result || result.err) {
        return result;
      }

      switch (result.type) {
      case 'NL':
        return sails.helpers.normalizeFormulaOperand(_.reduce(result.value, (max, n) => Math.max(max, n), -Infinity));
      case 'PL':
        var max = BigNumber.maximum(_.map(result.value, (big) => new BigNumber(big)));
        return {
          type: 'P',
          value: max.toString()
        };
      case 'N':
      case 'P':
        return result;
      default:
        return {
          err: 'Invalid operand for function: max'
        };
      }
    });

    var result = _.reduce(operands, (max, operand) => {
      if (max.err) {
        return total;
      }

      if (operand.err) {
        return {
          err: operand.err
        };
      }

      if (operand.type === 'P' || max.type === 'P') {
        operand = sails.helpers.castNumberToPrecision(operand);
        max = sails.helpers.castNumberToPrecision(max);
        return {
          type: 'P',
          value: BigNumber.maximum([ new BigNumber(operand.value), new BigNumber(max.value) ]).toString()
        };
      } else {
        return {
          type: 'N',
          value: Math.max(operand.value, max.value)
        };
      }
    }, sails.helpers.normalizeFormulaOperand(-Infinity));

    return exits.success(result);
  }
};
