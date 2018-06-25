module.exports = {
  friendlyName: 'Evaluate Unary Number',
  description: 'Evaluates a unary operation on a native number metadata value',
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
    switch (inputs.operator) {
    case '+':
      return exits.success({
        type: 'N',
        value: inputs.operand.value
      });
    case '-':
      return exits.success({
        type: 'N',
        value: -inputs.operand.value
      });
    default:
      return exits.success(null);
    }
  }
};
