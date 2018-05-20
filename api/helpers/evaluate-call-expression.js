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
        'sum',
        'avg', 'average', 'mean'
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
    case 'avg':
    case 'average':
    case 'mean':
      return exits.success(sails.helpers.evaluateCallAverage(inputs.arguments, inputs.context));
    default:
      return exits.success({
        err: 'Unknown function ' + inputs.callee
      });
    }
  }
};
