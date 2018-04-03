module.exports = {
  friendlyName: 'Evaluate Binary Precision',
  description: 'Evaluates a binary operation on two precision metadata values',
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
    var res;

    lval = new BigNumber(inputs.lval.value);
    rval = new BigNumber(inputs.rval.value);

    switch (op) {
    case '*':
      res = lval.times(rval);
      break;
    case '+':
      res = lval.plus(rval);
      break;
    case '-':
      res = lval.minus(rval);
      break;
    default:
      res = lval;
      break;
    }

    return {
      type: 'P',
      value: res.toString()
    };
  }
};
