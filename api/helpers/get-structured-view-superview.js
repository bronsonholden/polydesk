module.exports = {
  friendlyName: 'Generate Structured View Superview',
  description: 'Retrieve the superview of the given structured view',
  inputs: {
    account: {
      type: 'number',
      required: true,
      description: 'The account ID owning the structured view'
    },
    view: {
      type: 'number',
      required: true,
      description: 'The structured view ID to retrieve the superview for'
    }
  },
  exits: {
    success: {
      outputFriendlyName: 'Superview',
      outputDescription: 'The superview of the given structured view'
    },
    error: {
      description: 'A server error occurred'
    }
  },
  fn: (inputs, exits) => {
    exits.success();
  }
};
