/**
 * MetadataGroup.js
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
    account: {
      model: 'Account',
      required: true
    },
    parent: {
      model: 'MetadataGroup',
      via: 'children'
    },
    children: {
      collection: 'MetadataGroup',
      via: 'parent'
    }
  }
};
