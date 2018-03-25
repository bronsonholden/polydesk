/**
 * Sample data for development environments
 *
 * Project hook to create some sample data after lifting.
 */

const AWS = require('aws-sdk');

module.exports = (sails) => {
  return {
    initialize: (callback) => {
      if (process.env.NODE_ENV === 'production') {
        return callback();
      }

      sails.on('hook:orm:loaded', () => {
        async.waterfall([
          (callback) => {
            sails.helpers.createNewUser.with({
              email: 'rest@polydesk.com',
              password: 'password'
            }).switch({
              success: (user) => {
                sails.log.info('Created test user and account');

                callback(null, user);
              },
              error: (err) => {
                callback({
                  message: err.message
                });
              },
              accountAlreadyExists: (err) => {
                callback({
                  message: err.message
                });
              },
              userAlreadyExists: (err) => {
                callback({
                  message: err.message
                });
              }
            });
          },
          (user, callback) => {
            sails.log.info('Created test document');

            Document.create({
              account: user.defaultAccount,
              name: 'test',
              fileType: 'pdf'
            }).fetch().exec((err, doc) => {
              callback(err, user, doc);
            });
          },
          (user, doc, callback) => {
            sails.helpers.addObjectMetadataSet.with({
              account: user.defaultAccount,
              object: doc.id,
              objectType: 'document',
              setName: 'Test Set',
              metadata: {
                'Field 1': 'Value 1',
                'Field 2': 'Value 2',
                'Field 3': true,
                'Field 4': 1234
              }
            }).switch({
              success: (metadataSet) => {
                sails.log.info('Created sample document metadata set');

                callback();
              },
              error: (err) => {
                callback({
                  message: err.message
                });
              },
              invalidObjectType: (err) => {
                callback({
                  message: err.message
                });
              }
            })
          }
        ], callback);
      });
    }
  };
}
