module.exports = {
  friendlyName: 'Evaluate Binary Number',
  description: 'Evaluates a binary operation on two native number metadata values',
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
        '+',
        '-',
        '*',
        '/',
        '%',
        '^',
        '<',
        '>',
        '<=',
        '>=',
        '==',
        '!='
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
    case '*':
      return exits.success({
        type: 'N',
        value: inputs.lval.value * inputs.rval.value
      });
    case '+':
      return exits.success({
        type: 'N',
        value: inputs.lval.value + inputs.rval.value
      });
    case '-':
      return exits.success({
        type: 'N',
        value: inputs.lval.value - inputs.rval.value
      });
    case '/':
      return exits.success({
        type: 'N',
        value: inputs.lval.value / inputs.rval.value
      });
    case '%':
      return exits.success({
        type: 'N',
        value: inputs.lval.value % inputs.rval.value
      });
    case '^':
      return exits.success({
        type: 'N',
        value: inputs.lval.value ** inputs.rval.value
      });
    case '<':
      return exits.success({
        type: 'B',
        value: inputs.lval.value < inputs.rval.value
      });
    case '>':
      return exits.success({
        type: 'B',
        value: inputs.lval.value > inputs.rval.value
      });
    case '<=':
      return exits.success({
        type: 'B',
        value: inputs.lval.value <= inputs.rval.value
      });
    case '>=':
      return exits.success({
        type: 'B',
        value: inputs.lval.value >= inputs.rval.value
      });
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
    default:
      return exits.success(null);
    }
  }
};
