module.exports = {
  friendlyName: 'Create New Account',
  description: 'Create a new account',
  inputs: {
    name: {
      type: 'string',
      description: 'The name of the new account',
      required: true
    }
  },
  exits: {
    success: {
      outputFriendlyName: 'User',
      outputDescription: 'The newly created user'
    },
    error: {
      description: 'A server error occurred'
    },
    accountAlreadyExists: {
      description: 'An account for that email already exists'
    }
  },
  fn: (inputs, exits) => {
    sails.getDatastore().transaction((db, callback) => {
      async.waterfall([
        /**
         * Check if an account already exists
         */
        (callback) => {
          Account.findOne({
            name: inputs.name
          }).usingConnection(db).exec((err, account) => {
            if (err) {
              return callback(err);
            }

            if (account) {
              var e = new Error('An account for that email already exists');
              e.code = 'E_ACCOUNT_ALREADYEXISTS';
              return callback(e);
            }

            callback();
          });
        },
        /**
         * Create the account
         */
        (callback) => {
          Account.create({
            name: inputs.name
          }).usingConnection(db).fetch().exec((err, account) => {
            if (err) {
              return callback(err);
            }

            callback(null, account);
          });
        }
      ], (err, account) => {
        if (err) {
          return callback(err);
        }

        callback(null, account);
      });
    }).intercept('E_ACCOUNT_ALREADYEXISTS', (err) => {
      exits.accountAlreadyExists(err);
    }).intercept((err) => {
      exits.error(err);
    }).exec((err, account) => {
      if (!err) {
        exits.success(account);
      }
    });
  }
};
