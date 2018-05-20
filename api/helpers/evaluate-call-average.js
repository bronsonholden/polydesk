const BigNumber = require('bignumber.js');

module.exports = {
  friendlyName: 'Evaluate Call Expression: average()',
  description: 'Evaluates a formula function call: average()',
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
    var count = 0;
    var operands = _.map(inputs.arguments, (arg) => {
      var result = sails.helpers.evaluateExpressionNode(arg, inputs.context);

      if (!result || result.err) {
        return result;
      }

      switch (result.type) {
      case 'NL':
        count += result.value.length;
        return sails.helpers.normalizeFormulaOperand(_.reduce(result.value, (sum, n) => sum + n, 0));
      case 'PL':
        count += result.value.length;
        var sum = _.reduce(result.value, (s, n) => s.plus(new BigNumber(n)), new BigNumber(0));
        return {
          type: 'P',
          value: sum.toString()
        };
      case 'N':
      case 'P':
        count += 1;
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

    count = sails.helpers.normalizeFormulaOperand(count);

    switch (total.type) {
    case 'N':
      total = sails.helpers.evaluateBinaryNumber(total, count, '/');
      break;
    case 'P':
      total = sails.helpers.evaluateBinaryPrecision(total, sails.helpers.castNumberToPrecision(count), '/');
      break;
    default:
      return exits.success({
        err: 'Invalid total value'
      });
    }

    return exits.success(total);
  }
};
