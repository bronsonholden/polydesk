module.exports = {
  friendlyName: 'Create metadata group',
  description: 'Creates a new metadata group for an account',
  inputs: {
    name: {
      type: 'string',
      description: 'The name of the new metadata group',
      required: true
    },
    account: {
      type: 'number',
      description: 'The account ID to create the metadata group in',
      required: true
    }
  },
  exits: {
    success: {
      outputFriendlyName: 'Metadata group',
      outputDescription: 'The newly created metadata group'
    },
    error: {
      description: 'A server error occurred'
    },
    noSuchAccount: {
      description: 'No account exists with that ID'
    },
    alreadyExists: {
      description: 'A metadata group with that name already exists'
    }
  },
  fn: (inputs, exits) => {
    // unique(account, name)
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
          })
        },
        (callback) => {
          MetadataGroup.findOne({
            account: inputs.account,
            name: inputs.name
          }).usingConnection(db).exec((err, metadataGroup) => {
            if (err) {
              return callback(err);
            }

            if (metadataGroup) {
              var e = new Error('A metadata group with that name already exists in this account');
              e.code = 'E_METADATAGROUP_EXISTS';
              return callback(e);
            }

            callback();
          });
        },
        (callback) => {
          MetadataGroup.create({
            account: inputs.account,
            name: inputs.name
          }).usingConnection(db).fetch().exec((err, metadataGroup) => {
            if (err) {
              return callback(err);
            }

            callback(null, metadataGroup);
          });
        }
      ], (err, metadataGroup) => {
        if (err) {
          return callback(err);
        }

        callback(err, metadataGroup);
      })
    }).intercept('E_MISSING', (err) => {
      exits.noSuchAccount(err);
    }).intercept('E_METADATAGROUP_EXISTS', (err) => {
      exits.alreadyExists(err);
    }).intercept((err) => {
      exits.error(err);
    }).exec((err, metadataGroup) => {
      if (!err) {
        exits.success(metadataGroup);
      }
    });
  }
};
