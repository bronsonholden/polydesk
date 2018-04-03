module.exports = {
  friendlyName: 'Evaluate Unary Number',
  description: 'Evaluates a unary operation on a native number metadata value',
  sync: true,
  inputs: {
    operand: {
      type: 'number',
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
      return exits.success(-inputs.operand);
    default:
      return exits.success(null);
    }
  }
};
