module.exports = {
  friendlyName: 'Set Metadata Group Fields',
  description: 'Set metadata fields for a metadata group. Any existing fields not in the new field set are removed',
  inputs: {
    metadataGroup: {
      type: 'number',
      description: 'The metadata group ID to set metadata fields for',
      required: true
    },
    metadataFields: {
      type: 'ref',
      description: 'The ordered metadata fields to set for the metadata group',
      required: true
    }
  },
  exits: {
    success: {
      outputFriendlyName: 'Metadata group',
      outputDescription: 'The edited metadata group'
    },
    error: {
      description: 'A server error occurred'
    },
    noSuchMetadataGroup: {
      description: 'No metadata group exists with that ID'
    },
    fieldValidation: {
      description: 'Metadata fields did not match specification'
    }
  },
  fn: (inputs, exits) => {
    const fieldTypes = [
      'string'
    ];

    // Do metadataFields validation here so we can provide useful error
    // descriptions in the response.

    if (!_.isArray(inputs.metadataFields)) {
      var e = new Error('metadataFields must be an Array');
      e.code = 'E_VALIDATION';
      return exits.fieldValidation(e);
    }

    for (var i = 0; i < inputs.metadataFields.length; ++i) {
      var field = inputs.metadataFields;

      if (!_.isString(field[i].type)) {
        var e = new Error(`Field property \`type\' must be a string`);
        e.code = 'E_VALIDATION';
        return exits.fieldValidation(e);
      }

      if (fieldTypes.indexOf(field[i].type) < 0) {
        var e = new Error(`Field property \`type\' must be one of: [ ${fieldTypes.join(', ')} ]`);
        e.code = 'E_VALIDATION';
        return exits.fieldValidation(e);
      }

      if (!_.isString(field[i].name)) {
        var e = new Error(`Field property \`name\' must be a string`);
        e.code = 'E_VALIDATION';
        return exits.fieldValidation(e);
      }
    }

    // Stub

    exits.success();
  }
};
