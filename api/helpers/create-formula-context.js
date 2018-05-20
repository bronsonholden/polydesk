module.exports = {
  friendlyName: 'Create Formula Context',
  description: 'Generates an empty context for evaluating formulas',
  sync: true,
  inputs: {
  },
  exits: {
    success: {
      outputFriendlyName: 'Formula Context',
      outputDescription: 'Empty formula context'
    }
  },
  fn: (inputs, exits) => {
    exits.success({
      metadataSets: {},
      formulaResults: {},
      formulaStack: [],
      setStack: []
    });
  }
};
