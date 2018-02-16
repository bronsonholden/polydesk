module.exports = {
  friendlyName: 'Add User to Group',
  description: 'Add a user to a user group',
  inputs: {
    user: {
      type: 'number',
      description: 'The user to add to the user group',
      required: true
    },
    userGroup: {
      type: 'number',
      description: 'The user group to be added to',
      required: true
    }
  },
  exits: {
    success: {
      outputFriendlyName: 'User',
      outputDescription: 'The user added to the user group'
    },
    error: {
      description: 'A server error occurred'
    },
    noSuchUser: {
      description: 'No user exists with that ID'
    },
    noSuchUserGroup: {
      description: 'No user group exists with that ID'
    },
    notInSameAccount: {
      description: 'User and user group are not in the same account'
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
              var e = new Error('No user exists with that ID');
              e.code = 'E_USER_NOEXISTS';
              return callback(e);
            }

            callback();
          });
        },
        (callback) => {
          UserGroup.findOne({
            id: inputs.userGroup
          }).usingConnection(db).exec((err, userGroup) => {
            if (err) {
              return callback(err);
            }

            if (!userGroup) {
              var e = new Error('No user group exists with that ID');
              e.code = 'E_USERGROUP_NOEXISTS';
              return callback(e);
            }

            callback(null, userGroup);
          });
        },
        (userGroup, callback) => {
          User.findOne({
            id: inputs.user
          }).populate('accounts', {
            id: userGroup.account
          }).usingConnection(db).exec((err, user) => {
            if (err) {
              return callback(err);
            }

            if (!user) {
              var e = new Error('User and user group do not exist in the same account');
              e.code = 'E_NOTINSAMEACCOUNT';
              return callback(e);
            }

            callback(null, user, userGroup);
          });
        },
        (user, userGroup, callback) => {
          UserGroup.addToCollection(userGroup.id, 'users', user.id).usingConnection(db).exec((err) => {
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
    }).intercept('E_USER_NOEXISTS', (err) => {
      exits.noSuchUser(err);
    }).intercept('E_USERGROUP_NOEXISTS', (err) => {
      exits.noSuchUserGroup(err);
    }).intercept('E_NOTINSAMEACCOUNT', (err) => {
      exits.notInSameAccount(err);
    }).intercept((err) => {
      exits.error(err);
    }).exec((err, user) => {
      if (!err) {
        exits.success(user);
      }
    });
  }
};
