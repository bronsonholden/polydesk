/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

const bcrypt = require('bcryptjs');

module.exports = {
  attributes: {
    email: {
      type: 'string',
      isEmail: true,
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      minLength: 8,
      required: true
    },
    defaultAccount: {
      model: 'Account'
    },
    accounts: {
      collection: 'Account',
      via: 'users'
    },
    groups: {
      collection: 'UserGroup',
      via: 'users'
    }
  },
  customToJSON: function () {
    return {
      id: this.id,
      email: this.email,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      defaultAccount: this.defaultAccount
    };
  },
  beforeCreate: (user, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return callback(err);
      }

      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) {
          return callback(err);
        }

        user.password = hash;
        callback();
      });
    });
  }
};
