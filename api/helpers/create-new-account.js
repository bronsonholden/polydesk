const arangoDb = require('arangojs');

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
        },
        (account, callback) => {
          const collectionName = sails.config.metadata.arangoDb.collection.replace('%account', account.id);
          var db = new arangoDb.Database({
            url: sails.config.metadata.arangoDb.url
          });

          db.useDatabase(sails.config.metadata.arangoDb.database);
          db.useBasicAuth(sails.config.metadata.arangoDb.username, sails.config.metadata.arangoDb.password);
          db.collection(collectionName).create();
          db.collection(`structured-views-${account.id}`).create();
          db.collection(`metadata-pins-${account.id}`).create();
          db.edgeCollection(`structured-view-edges-${account.id}`).create();

          callback(null, account);
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
