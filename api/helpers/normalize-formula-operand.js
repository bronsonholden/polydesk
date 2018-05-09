module.exports = {
  friendlyName: 'Normalize Formula Operand',
  description: 'Generates a normalized metadata value from primitive types',
  sync: true,
  inputs: {
    operand: {
      type: 'ref',
      required: true
    }
  },
  exits: {
    success: {
      outputFriendlyName: 'Normalized Operand',
      outputDescription: 'Normalized operand for use in metadata formula calculations'
    }
  },
  fn: (inputs, exits) => {
    switch (typeof inputs.operand) {
    case 'string':
      return exits.success({
        type: 'S',
        value: inputs.operand
      });
    case 'number':
      return exits.success({
        type: 'N',
        value: inputs.operand
      });
    case 'boolean':
      return exits.success({
        type: 'B',
        value: inputs.operand
      });
    default:
      break;
    }

    return exits.success(inputs.operand);
  }
};
