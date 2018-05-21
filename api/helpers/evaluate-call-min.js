const BigNumber = require('bignumber.js');

module.exports = {
  friendlyName: 'Evaluate Call Expression: min()',
  description: 'Evaluates a formula function call: min()',
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
        return sails.helpers.normalizeFormulaOperand(_.reduce(result.value, (min, n) => Math.min(min, n), Infinity));
      case 'PL':
        var min = BigNumber.minimum(_.map(result.value, (big) => new BigNumber(big)));
        return {
          type: 'P',
          value: min.toString()
        };
      case 'N':
      case 'P':
        return result;
      default:
        return {
          err: 'Invalid operand for function: min'
        };
      }
    });

    var result = _.reduce(operands, (min, operand) => {
      if (min.err) {
        return total;
      }

      if (operand.err) {
        return {
          err: operand.err
        };
      }

      if (operand.type === 'P' || min.type === 'P') {
        operand = sails.helpers.castNumberToPrecision(operand);
        min = sails.helpers.castNumberToPrecision(min);
        return {
          type: 'P',
          value: BigNumber.minimum([ new BigNumber(operand.value), new BigNumber(min.value) ]).toString()
        };
      } else {
        return {
          type: 'N',
          value: Math.min(operand.value, min.value)
        };
      }
    }, sails.helpers.normalizeFormulaOperand(Infinity));

    return exits.success(result);
  }
};
