const jsep = require('jsep');

module.exports = {
  friendlyName: 'Evaluate Call Expression',
  description: 'Evaluates a formula function call expression',
  sync: true,
  inputs: {
    callee: {
      type: 'string',
      required: true,
      enum: [
        'field',
        'sum'
      ]
    },
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
    switch (inputs.callee) {
    case 'field':
      return exits.success(sails.helpers.evaluateCallField(inputs.arguments, inputs.context));
    case 'sum':
      return exits.success(sails.helpers.evaluateCallSum(inputs.arguments, inputs.context));
    default:
      return exits.success({
        err: 'Unknown function ' + inputs.callee
      });
    }
  }
};
