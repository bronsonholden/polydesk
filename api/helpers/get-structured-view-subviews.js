module.exports = {
  friendlyName: 'Generate Structured View Subviews',
  description: 'Generate a list of subviews under the given structured view',
  inputs: {
    account: {
      type: 'number',
      required: true,
      description: 'The account ID owning the structured view'
    },
    view: {
      type: 'number',
      required: true,
      description: 'The structured view ID to generate subviews for'
    }
  },
  exits: {
    success: {
      outputFriendlyName: 'Subview List',
      outputDescription: 'The list of subviews for this structured view'
    },
    error: {
      description: 'A server error occurred'
    }
  },
  fn: (inputs, exits) => {
    exits.success();
  }
};
