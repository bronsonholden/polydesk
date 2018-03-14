/**
 * Activation.js
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
    expires: {
      type: 'number',
      required: true
    },
    activated: {
      type: 'string',
      columnType: 'date',
      allowNull: true
    },
    token: {
      type: 'string',
      isUUID: true,
      required: true
    }
  }
};
