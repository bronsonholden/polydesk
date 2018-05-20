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
      enum: [
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
    if (inputs.lval.type !== 'B' || inputs.rval.type !== 'B') {
      return exits.success({
        err: 'Invalid operands'
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
