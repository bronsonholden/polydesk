const jsep = require('jsep');

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
      case 'N':
        count += 1;
        return result;
      default:
        return {
          err: 'Invalid operand for function: sum'
        };
      }
    });

    var avg = _.reduce(operands, (total, operand) => {
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

    return exits.success(sails.helpers.evaluateBinaryNumber(avg, sails.helpers.normalizeFormulaOperand(count), '/'));
  }
};
