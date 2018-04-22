module.exports = {
  friendlyName: 'Create New User and Account',
  description: 'Create a new user and default account',
  inputs: {
    email: {
      type: 'string',
      description: 'The email address of the new user',
      required: true
    },
    password: {
      type: 'string',
      description: 'The plaintext password',
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
    },
    userAlreadyExists: {
      description: 'A user with that email already exists'
    }
  },
  fn: (inputs, exits) => {
    sails.getDatastore().transaction((db, callback) => {
      async.waterfall([
        /**
         * Check if a user already exists with that email
         */
        (callback) => {
          User.findOne({
            email: inputs.email
          }).usingConnection(db).exec((err, user) => {
            if (err) {
              return callback(err);
            }

            if (user) {
              var e = new Error('A user with that email already exists');
              e.code = 'E_USER_ALREADYEXISTS';
              return callback(err);
            }

            callback();
          });
        },
        /**
         * Check if an account already exists for that user
         */
        (callback) => {
          Account.findOne({
            name: inputs.email
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
         * Create the user's default account
         */
        (callback) => {
          Account.create({
            name: inputs.email
          }).usingConnection(db).fetch().exec((err, account) => {
            if (err) {
              return callback(err);
            }

            callback(null, account);
          });
        },
        /**
         * Create the user
         */
        (account, callback) => {
          User.create({
            email: inputs.email,
            password: inputs.password,
            defaultAccount: account.id
          }).usingConnection(db).fetch().exec((err, user) => {
            if (err) {
              return callback(err);
            }

            callback(null, user, account);
          });
        },
        /**
         * Add user to their account
         */
        (user, account, callback) => {
          User.addToCollection(user.id, 'accounts', account.id).usingConnection(db).exec((err) => {
            if (err) {
              return callback(err);
            }

            callback(null, user, account);
          });
        },
        /**
         * Add all capabilities for that user in their account
         */
        (user, account, callback) => {
          var arr = [
            'can_login',
            'view_documents',
            'upload_documents',
            'add_document_metadata_sets',
            'update_document_metadata_sets',
            'remove_document_metadata_sets',
            'edit_metadata_groups',
            'edit_workflows'
          ].map((cap) => {
            return {
              name: cap,
              user: user.id,
              account: account.id
            };
          });

          Capability.createEach(arr).usingConnection(db).exec((err) => {
            if (err) {
              return callback(err);
            }

            callback(null, user);
          });
        }
      ], (err, user) => {
        if (err) {
          return callback(err);
        }

        callback(null, user);
      });
    }).intercept('E_ACCOUNT_ALREADYEXISTS', (err) => {
      exits.accountAlreadyExists(err);
    }).intercept('E_USER_ALREADYEXISTS', (err) => {
      exits.userAlreadyExists(err);
    }).intercept((err) => {
      exits.error(err);
    }).exec((err, user) => {
      if (!err) {
        exits.success(user);
      }
    });
  }
};
