/**
 * Capability.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    user: {
      model: 'User',
      required: true
    },
    account: {
      model: 'Account',
      required: true
    },
    name: {
      type: 'string',
      required: true,
      isIn: [
        'can_login',
        'view_documents',
        'upload_documents',
        'edit_metadata_groups',
        'edit_workflows'
      ]
    }
  }
};
