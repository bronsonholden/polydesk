module.exports = {
  friendlyName: 'Get Structured View Filter Expression',
  description: 'Get an AQL filter expression for use in structured view queries',
  inputs: {
    account: {
      type: 'number',
      required: true,
      description: 'The account ID to create metadata for'
    },
    view: {
      type: 'number',
      required: true,
      description: 'The structured view ID to generate'
    },
    recurse: {
      type: 'boolean',
      defaultsTo: false,
      description: 'Generate filter expressions for parent views'
    }
  },
  exits: {
    success: {
      outputFriendlyName: 'Filter Expression',
      outputDescription: 'The filter expression for this structured view'
    },
    error: {
      description: 'A server error occurred'
    }
  },
  fn: (inputs, exits) => {
    // 1) Get structured view configuration from ArangoDB
    // 2) If recurse === true and view has parent, generate parent and return
    //    <parent expression> AND <child expresison>
    // 3) Else return generated expression

    exits.success('FALSE');
  }
};
