/**
 * MetadataField.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    name: {
      type: 'string',
      required: true
    },
    fieldIndex: {
      type: 'number',
      required: true
    },
    metadataGroup: {
      model: 'MetadataGroup',
      required: true
    }
  },
  customToJSON: function () {
    this.type = 'string';
    return this;
  }
};