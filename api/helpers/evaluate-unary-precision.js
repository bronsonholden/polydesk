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
      enum: [
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
    switch (op) {
    case '+':
      return exits.success(inputs.operand);
    case '-':
      return exits.success(inputs.operand.negated());
    default:
      return exits.success(null);
    }
  }
};
