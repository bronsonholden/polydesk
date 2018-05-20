/**
 * Sample data for development environments
 *
 * Project hook to create some sample data after lifting.
 */

const _ = require('lodash');

module.exports = (sails) => {
  return {
    initialize: (callback) => {
      if (process.env.NODE_ENV === 'production' || !_.get(sails, 'config.polydesk.generateSampleData')) {
        return callback();
      }

      sails.on('hook:orm:loaded', () => {
        async.waterfall([
          (callback) => {
            sails.helpers.createNewUserAndAccount.with({
              email: 'rest@polydesk.com',
              password: 'password'
            }).switch({
              success: (user) => {
                sails.log.info('Created test user and account');

                callback(null, user);
              },
              error: (err) => {
                callback(err);
              },
              accountAlreadyExists: (err) => {
                callback(err);
              },
              userAlreadyExists: (err) => {
                callback(err);
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
              order: 0,
              metadata: {
                'Field 1': {
                  type: 'S',
                  value: 'StringValue',
                  order: 0
                },
                'Field 2': {
                  type: 'N',
                  value: 125.38,
                  order: 1
                },
                'Field 3': {
                  type: 'B',
                  value: true,
                  order: 2
                },
                'pi': {
                  type: 'P',
                  value: '3.14159265358979323846264338327950288419716939937510',
                  order: 3
                  // 2 * pi = 6.2831853071795864769252867665590057683943387987502
                },
                '2pi': {
                  type: 'F',
                  value: 'field("pi") * 2',
                  order: 4
                },
                'circular 1': {
                  type: 'F',
                  value: 'field("circular 2") + 1'
                },
                'circular 2': {
                  type: 'F',
                  value: 'field("circular 1") + 1'
                },
                'circular 3': {
                  type: 'F',
                  value: 'field("circular 1") * 5'
                },
                '2pi+1': {
                  type: 'F',
                  value: 'field("2pi") + 1',
                  order: 8
                },
                '-(2pi+1)': {
                  type: 'F',
                  value: '-field("2pi+1")',
                  order: 9
                },
                '1+1': {
                  type: 'F',
                  value: '1 + 1',
                  order: 10
                },
                'next+1': {
                  type: 'F',
                  value: 'field("next") + 1',
                  order: 11
                },
                'next': {
                  type: 'N',
                  value: 1,
                  order: 12
                },
                'pi/2': {
                  type: 'F',
                  value: 'field("pi") / 2',
                  order: 13
                },
                'pi%2': {
                  type: 'F',
                  value: 'field("pi") % 2',
                  order: 14
                },
                'pi^2': {
                  type: 'F',
                  value: 'field("pi") ^ 2',
                  order: 15
                }
              }
            }).switch({
              success: (metadataSet) => {
                sails.log.info('Created sample document metadata set');

                callback(null, user, doc);
              },
              error: (err) => {
                callback(err);
              },
              invalidObjectType: (err) => {
                callback(err);
              }
            });
          },
          (user, doc, callback) => {
            sails.helpers.addObjectMetadataSet.with({
              account: user.defaultAccount,
              object: doc.id,
              objectType: 'document',
              setName: 'Test Repeating Attributes',
              order: 1,
              metadata: {
                'numbers': {
                  type: 'NL',
                  value: [ 1, 2, 3, 4 ],
                  order: 0
                },
                'sum(numbers)': {
                  type: 'F',
                  value: 'sum(field("numbers"))',
                  order: 1
                },
                'avg(numbers)': {
                  type: 'F',
                  value: 'avg(field("numbers"))',
                  order: 2
                },
                'precisions': {
                  type: 'PL',
                  value: [
                    '1.000000000000000001',
                    '2.000000000000000001',
                    '3.000000000000000001',
                    '4.000000000000000001',
                  ],
                  order: 3
                },
                'sum(precisions)': {
                  type: 'F',
                  value: 'sum(field("precisions"))',
                  order: 4
                },
                'avg(precisions)': {
                  type: 'F',
                  value: 'avg(field("precisions"))',
                  order: 5
                }
              }
            }).switch({
              success: (metadataSet) => {
                sails.log.info('Created sample document metadata set');

                callback();
              },
              error: (err) => {
                callback(err);
              },
              invalidObjectType: (err) => {
                callback(err);
              }
            });
          }
        ], callback);
      });
    }
  };
};
