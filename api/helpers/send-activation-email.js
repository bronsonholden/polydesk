const uuid = require('uuid/v4');

module.exports = {
  friendlyName: 'Send Activation Email',
  description: 'Sends an activation email for a new user',
  inputs: {
    email: {
      type: 'string',
      isEmail: true,
      required: true,
      example: 'user@polydesk.com'
    },
    expires: {
      type: 'number',
      defaultsTo: sails.config.polydesk.defaultActivationExpires
    }
  },
  exits: {
    success: {
      outputFriendlyName: 'Activation instance',
      outputDescription: 'The new activation instance'
    },
    error: {
      description: 'A server error occurred'
    },
    noSuchUser: {
      description: 'No user exists with that email address'
    },
    alreadyActivated: {
      description: 'That user is already activated'
    }
  },
  fn: (inputs, exits) => {
    sails.getDatastore().transaction((db, callback) => {
      async.waterfall([
        /**
         * Check if the user exists
         */
        (callback) => {
          User.findOne({
            email: inputs.email
          }).usingConnection(db).exec((err, user) => {
            if (err) {
              return callback(err);
            }

            if (!user) {
              var e = new Error('No user exists with that email address');
              e.code = 'E_MISSING';
              return callback(e);
            }

            callback(null, user);
          });
        },
        /**
         * Check if the user is already activated
         */
        (user, callback) => {
          Activation.findOne({
            user: user.id,
            activated: null
          }).usingConnection(db).exec((err, activation) => {
            if (err) {
              return callback(err);
            }

            if (activation) {
              var e = new Error('That user is already activated');
              e.code = 'E_ACTIVATED';
              return callback(e);
            }

            callback(null, user);
          });
        },
        /**
         * Create an Activation instance
         */
        (user, callback) => {
          Activation.create({
            user: user.id,
            email: inputs.email,
            expires: inputs.expires,
            token: uuid()
          }).usingConnection(db).fetch().exec((err, activation) => {
            if (err) {
              return callback(err);
            }

            callback(null, activation);
          });
        },
        /**
         * Send the activation email
         */
        (activation, callback) => {
          // All emails are stubs for now
          callback(null, activation);
        }
      ], (err, activation) => {
        if (err) {
          return callback(err);
        }

        callback(null, activation);
      });
    }).intercept('E_MISSING', (err) => {
      exits.noSuchUser(err);
    }).intercept('E_ACTIVATED', (err) => {
      exits.alreadyActivated(err);
    }).intercept((err) => {
      exits.error(err);
    }).exec((err, activation) => {
      if (!err) {
        exits.success(activation);
      }
    });
  }
};
