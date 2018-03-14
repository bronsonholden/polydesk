/**
 * Document.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

const uuid = require('uuid/v4');

module.exports = {
  attributes: {
    name: {
      type: 'string',
      required: true,
    },
    fileType: {
      type: 'string',
      required: true,
      isIn: [
        'pdf',
        'txt',
        'csv',
        'json',
        'xml'
      ]
    }
  }
};
