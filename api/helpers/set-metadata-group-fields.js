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
    },
    put: {
      type: 'bool',
      description: 'Whether to remove existing fields not present in the given array',
      defaultsTo: false
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
      e.code = 'E_FIELDVALIDATION';
      return exits.fieldValidation(e);
    }

    for (var i = 0; i < inputs.metadataFields.length; ++i) {
      var field = inputs.metadataFields;

      if (!_.isString(field[i].type)) {
        var e = new Error(`Field property \`type\' must be a string`);
        e.code = 'E_FIELDVALIDATION';
        return exits.fieldValidation(e);
      }

      if (fieldTypes.indexOf(field[i].type) < 0) {
        var e = new Error(`Field property \`type\' must be one of: [ ${fieldTypes.join(', ')} ]`);
        e.code = 'E_FIELDVALIDATION';
        return exits.fieldValidation(e);
      }

      if (!_.isString(field[i].name)) {
        var e = new Error(`Field property \`name\' must be a string`);
        e.code = 'E_FIELDVALIDATION';
        return exits.fieldValidation(e);
      }
    }

    sails.getDatastore().transaction((db, callback) => {
      async.waterfall([
        /**
         * Check if the metadata group exists.
         */
        (callback) => {
          MetadataGroup.findOne({
            id: inputs.metadataGroup
          }).usingConnection(db).exec((err, metadataGroup) => {
            if (err) {
              return callback(err);
            }

            if (!metadataGroup) {
              var e = new Error('No metadata group exists with that ID');
              e.code = 'E_METADATAGROUP_NOEXISTS';
              return callback(e);
            }

            callback(null, metadataGroup);
          });
        },
        /**
         * If method is PUT, or request came via web, delete any existing
         * field configuration, as it will be replaced.
         */
        (metadataGroup, callback) => {
          if (inputs.put) {
            // With new field types, this would be an async waterfall
            // operation, but might as well be a separate helper...
            // clear-metadata-group-fields or similar
            MetadataStringField.destroy({
              metadataGroup: metadataGroup.id
            }).usingConnection(db).exec((err, removed) => {
              if (err) {
                return callback(err);
              }

              callback(null, metadataGroup);
            });
          } else {
            callback(null, metadataGroup);
          }
        },
        /**
         * Create String fields
         */
        (metadataGroup, callback) => {
          async.eachOfSeries(inputs.metadataFields.filter(f => f.type === 'string'), (field, idx, callback) => {
            MetadataStringField.create({
              metadataGroup: inputs.metadataGroup,
              name: field.name,
              fieldIndex: idx
            }).usingConnection(db).exec((err) => {
              callback(err);
            });
          }, (err) => {
            if (err) {
              return callback(err);
            }

            callback(null, metadataGroup);
          });
        }
      ], (err, metadataGroup) => {
        if (err) {
          return callback(err);
        }

        callback(null, metadataGroup);
      });
    }).intercept('E_METADATAGROUP_NOEXISTS', (err) => {
      exits.noSuchMetadataGroup(err);
    }).intercept('E_FIELDVALIDATION', (err) => {
      exits.fieldValidation(err);
    }).exec((err, metadataGroup) => {
      if (!err) {
        exits.success(metadataGroup);
      }
    });
  }
};
