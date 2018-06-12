module.exports = {
  friendlyName: 'Evaluate Unary Boolean',
  description: 'Evaluates a unary operation on a boolean metadata value',
  sync: true,
  inputs: {
    operand: {
      type: 'ref',
      required: true
    },
    operator: {
      type: 'string',
      isIn: [
        '!'
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
    if (inputs.operand.type !== 'B') {
      return exits.success({
        err: 'Invalid operand'
      });
    }

    switch (inputs.operator) {
    case '!':
      return exits.success({
        type: 'B',
        value: !inputs.operand.value
      });
    default:
      return exits.success({
        err: 'Invalid operator ' + inputs.operator
      });
    }
  }
};
