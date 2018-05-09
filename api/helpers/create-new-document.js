module.exports = {
  friendlyName: 'Create New Document',
  description: 'Create a new document',
  inputs: {
    name: {
      type: 'string',
      description: 'The name of the new document',
      required: true
    },
    account: {
      type: 'number',
      description: 'The account to add the document to',
      required: true
    },
    fileType: {
      type: 'string',
      isIn: sails.config.polydesk.supportedFileTypes,
      required: true
    }
  },
  exits: {
    success: {
      outputFriendlyName: 'Document',
      outputDescription: 'The newly created document'
    },
    error: {
      description: 'A server error occurred'
    },
    noSuchAccount: {
      description: 'No account with that ID exists'
    }
  },
  fn: (inputs, exits) => {
    sails.getDatastore().transaction((db, callback) => {
      async.waterfall([
        /**
         * Check if the account exists
         */
        (callback) => {
          Account.findOne({
            id: inputs.account
          }).usingConnection(db).exec((err, account) => {
            if (err) {
              return callback(err);
            }

            if (!account) {
              var e = new Error('No account with that ID exists');
              e.code = 'E_ACCOUNT_NOEXISTS';
              return callback(e);
            }

            callback();
          });
        },
        /**
         * Create the document in the account
         */
        (callback) => {
          Document.create({
            name: inputs.name,
            account: inputs.account,
            fileType: inputs.fileType
          }).usingConnection(db).fetch().exec((err, document) => {
            if (err) {
              return callback(err);
            }

            callback(null, document);
          });
        }
      ], (err, document) => {
        if (err) {
          return callback(err);
        }

        callback(null, document);
      });
    }).intercept('E_ACCOUNT_NOEXISTS', (err) => {
      exits.noSuchAccount(err);
    }).intercept((err) => {
      exits.error(err);
    }).exec((err, document) => {
      if (!err) {
        exits.success(document);
      }
    });
  }
};
