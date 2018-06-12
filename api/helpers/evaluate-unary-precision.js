const BigNumber = require('bignumber.js');

module.exports = {
  friendlyName: 'Evaluate Unary Precision',
  description: 'Evaluates a unary operation on a precision metadata value',
  sync: true,
  inputs: {
    operand: {
      type: 'ref',
      required: true
    },
    operator: {
      type: 'string',
      isIn: [
        '+',
        '-'
      ]
    }
  },
  exits: {
    success: {
      outputFriendlyName: 'Operation Result',
      outputDescription: 'Result of the operation'
    }
  },
  fn: (inputs, exits) => {
    var operand = new BigNumber(inputs.operand.value);

    switch (inputs.operator) {
    case '+':
      return exits.success({
        type: 'P',
        value: operand.toString()
      });
    case '-':
      return exits.success({
        type: 'P',
        value: operand.negated().toString()
      });
    default:
      return exits.success(null);
    }
  }
};
