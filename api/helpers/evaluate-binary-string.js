module.exports = {
  friendlyName: 'Evaluate Binary String',
  description: 'Evaluates a binary operation on two string metadata values',
  sync: true,
  inputs: {
    lval: {
      type: 'ref',
      required: true
    },
    rval: {
      type: 'ref',
      required: true
    },
    operator: {
      type: 'string',
      isIn: [
        '+'
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
        type: 'S',
        value: inputs.lval.value + inputs.rval.value
      });
    default:
      return exits.success(null);
    }
  }
};
