module.exports = {
  friendlyName: 'Evaluate Binary Boolean',
  description: 'Evaluates a binary operation on two boolean metadata values',
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
        '==',
        '!=',
        '||',
        '&&'
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
    case '==':
      return exits.success({
        type: 'B',
        value: inputs.lval.value === inputs.rval.value
      });
    case '!=':
      return exits.success({
        type: 'B',
        value: inputs.lval.value !== inputs.rval.value
      });
    case '||':
      return exits.success({
        type: 'B',
        value: inputs.lval.value || inputs.rval.value
      });
    case '&&':
      return exits.success({
        type: 'B',
        value: inputs.lval.value && inputs.rval.value
      });
    default:
      return exits.success({
        err: 'Invalid operator ' + inputs.operator
      });
    }
  }
};
