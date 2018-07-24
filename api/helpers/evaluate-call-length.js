module.exports = {
  friendlyName: 'Evaluate Call Expression: length()',
  description: 'Evaluates a formula function call: length()',
  sync: true,
  inputs: {
    arguments: {
      type: 'ref',
      required: true
    },
    context: {
      type: 'ref',
      required: true
    }
  },
  exits: {
    success: {
      outputFriendlyName: 'Operation Result',
      outputDescription: 'Result of the operation'
    }
  },
  fn: (inputs, exits) => {
    if (inputs.arguments.length !== 1) {
      return exits.error(new Error('Function "length" expects only 1 argument'));
    }

    var arg = sails.helpers.evaluateExpressionNode(inputs.arguments[0], inputs.context);

    switch (arg.type) {
    case 'S':
    case 'PL':
    case 'NL':
      return exits.success({
        type: 'N',
        value: arg.value.length
      });
    default:
      return exits.success();
    }
  }
};
