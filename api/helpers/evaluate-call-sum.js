const BigNumber = require('bignumber.js');

module.exports = {
  friendlyName: 'Evaluate Call Expression: sum()',
  description: 'Evaluates a formula function call: sum()',
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
        return sails.helpers.normalizeFormulaOperand(_.reduce(result.value, (sum, n) => sum + n, 0));
      case 'PL':
        var sum = _.reduce(result.value, (s, n) => s.plus(new BigNumber(n)), new BigNumber(0));
        return {
          type: 'P',
          value: sum.toString()
        };
      case 'N':
      case 'P':
        return result;
      default:
        return {
          err: 'Invalid operand for function: sum'
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

      if (operand.type === 'P' || total.type === 'P') {
        return sails.helpers.evaluateBinaryPrecision(total, sails.helpers.castNumberToPrecision(operand), '+');
      } else {
        return sails.helpers.evaluateBinaryNumber(total, operand, '+');
      }
    }, sails.helpers.normalizeFormulaOperand(0));

    return exits.success(total);
  }
};
