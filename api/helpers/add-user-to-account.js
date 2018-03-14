module.exports = {
  friendlyName: 'Add User to Account',
  description: 'Adds a user to an account',
  inputs: {
    user: {
      type: 'number',
      description: 'The user to add to the account',
      required: true
    },
    account: {
      type: 'number',
      description: 'The account to add the user to',
      required: true
    }
  },
  exits: {
    success: {
      outputFriendlyName: 'User',
      outputDescription: 'The user added to the account'
    },
    error: {
      description: 'A server error occurred'
    },
    noSuchUser: {
      description: 'No user with that ID exists'
    },
    noSuchAccount: {
      description: 'No account with that ID exists'
    },
    alreadyInAccount: {
      description: 'User is already a member of that account'
    }
  },
  fn: (inputs, exits) => {
    sails.getDatastore().transaction((db, callback) => {
      async.waterfall([
        (callback) => {
          User.findOne({
            id: inputs.user
          }).usingConnection(db).exec((err, user) => {
            if (err) {
              return callback(err);
            }

            if (!user) {
              var e = new Error('No user with that ID exists');
              e.code = 'E_USER_NOEXISTS';
              return callback(e);
            }

            callback(null, user);
          });
        },
        (user, callback) => {
          Account.findOne({
            id: inputs.account
          }).usingConnection(db).exec((err, account) => {
            if (err) {
              return callback(err);
            }

            if (!user) {
              var e = new Error('No account with that ID exists');
              e.code = 'E_ACCOUNT_NOEXISTS';
              return callback(e);
            }

            callback(null, user);
          });
        },
        (user, callback) => {
          User.findOne({
            id: inputs.user
          }).populate('accounts', {
            where: {
              id: inputs.account
            }
          }).usingConnection(db).exec((err, user) => {
            if (err) {
              return callback(err);
            }

            if (user.accounts.length !== 0) {
              var e = new Error('User is already a member of that account');
              e.code = 'E_ALREADYINACCOUNT';
              return callback(e);
            }

            callback(null, user);
          });
        },
        (user, callback) => {
          User.addToCollection(inputs.user, 'accounts', inputs.account).usingConnection(db).exec((err) => {
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
    }).intercept('E_ALREADYINACCOUNT', (err) => {
      exits.alreadyInAccount(err);
    }).intercept('E_USER_NOEXISTS', (err) => {
      exits.noSuchUser(err);
    }).intercept('E_ACCOUNT_NOEXISTS', (err) => {
      exits.noSuchAccount(err);
    }).intercept((err) => {
      exits.error(err);
    }).exec((err, user) => {
      if (!err) {
        exits.success(user);
      }
    });
  }
};
