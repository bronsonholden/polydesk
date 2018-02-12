module.exports = {
  friendlyName: 'Create User Group',
  description: 'Create a new user group for an account',
  inputs: {
    name: {
      type: 'string',
      description: 'The name for the new user group',
      required: true
    },
    account: {
      type: 'number',
      description: 'The account ID to create the user group in',
      required: true
    }
  },
  exits: {
    success: {
      outputFriendlyName: 'User Group',
      outputDescription: 'The newly created user group'
    },
    error: {
      description: 'A server error occurred'
    },
    noSuchAccount: {
      description: 'No account exists with that ID'
    },
    alreadyExists: {
      description: 'A user group with that name already exists'
    }
  },
  fn: (inputs, exits) => {
    sails.getDatastore().transaction((db, callback) => {
      async.waterfall([
        (callback) => {
          Account.findOne({
            id: inputs.account
          }).usingConnection(db).exec((err, account) => {
            if (err) {
              return callback(err);
            }

            if (!account) {
              var e = new Error('No account with that ID exists');
              e.code = 'E_MISSING';
              return callback(e);
            }

            callback();
          });
        },
        (callback) => {
          UserGroup.findOne({
            account: inputs.account,
            name: inputs.name,
          }).usingConnection(db).exec((err, userGroup) => {
            if (err) {
              return callback(err);
            }

            if (userGroup) {
              var e = new Error('A user group with that name already exists in this account');
              e.code = 'E_USERGROUP_EXISTS';
              return callback(e);
            }

            callback();
          });
        },
        (callback) => {
          UserGroup.create({
            account: inputs.account,
            name: inputs.name
          }).usingConnection(db).exec((err, userGroup) => {
            if (err) {
              return callback(err);
            }

            callback(null, userGroup);
          });
        }
      ], (err, userGroup) => {
        if (err) {
          return callback(err);
        }

        callback(null, userGroup);
      })
    }).intercept('E_MISSING', (err) => {
      exits.noSuchAccount({
        message: err.message
      });
    }).intercept('E_USERGROUP_EXISTS', (err) => {
      exits.alreadyExists({
        message: err.message
      });
    }).exec((err, userGroup) => {
      if (!err) {
        exits.success(userGroup);
      }
    });
  }
}
