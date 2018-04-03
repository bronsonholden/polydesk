module.exports = {
  friendlyName: 'Evaluate Binary Number',
  description: 'Evaluates a binary operation on two native number metadata values',
  sync: true,
  inputs: {
    lval: {
      type: 'number',
      required: true
    },
    rval: {
      type: 'number',
      required: true
    },
    operator: {
      type: 'string',
      enum: [
        '+',
        '-',
        '*'
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
    case '*':
      return inputs.lval * inputs.rval;
    case '+':
      return inputs.lval + inputs.rval;
    case '-':
      return inputs.lval - inputs.rval;
    default:
      return null;
    }
  }
};
