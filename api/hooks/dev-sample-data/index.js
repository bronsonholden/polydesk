/**
 * Sample data for development environments
 *
 * Project hook to create some sample data after lifting.
 */

const _ = require('lodash');
const arangoDb = require('arangojs');

module.exports = (sails) => {
  return {
    initialize: (callback) => {
      if (process.env.NODE_ENV === 'production' || !_.get(sails, 'config.polydesk.generateSampleData')) {
        return callback();
      }

      sails.after([
        'hook:orm:loaded',
        'hook:migrate-arangodb:loaded'
      ], () => {
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
                },
                'len(test)': {
                  type: 'F',
                  value: 'length("test")',
                  order: 16
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
                    '4.000000000000000001'
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
                },
                'len(numbers)': {
                  type: 'F',
                  value: 'length(field("numbers"))',
                  order: 6
                }
              }
            }).switch({
              success: (metadataSet) => {
                sails.log.info('Created sample document metadata set');

                callback(null, user);
              },
              error: (err) => {
                callback(err);
              },
              invalidObjectType: (err) => {
                callback(err);
              }
            });
          },
          (user, callback) => {
            /**
             * Create a sample structured view
             */

            var db = new arangoDb.Database({
              url: sails.config.metadata.arangoDb.url
            });

            db.useDatabase(sails.config.metadata.arangoDb.database);
            db.useBasicAuth(sails.config.metadata.arangoDb.username, sails.config.metadata.arangoDb.password);

            const collection = db.collection(`structured-views-${user.defaultAccount}`);

            collection.import([
              {
                _key: 'view-1',
                _view: 1,
                displayName: 'Employee Files',
                include: [
                  {
                    metadataSets: [
                      'Employee Files'
                    ]
                  }
                ],
                filterExpression: 'set._set == "Employee Files"'
              },
              {
                _key: 'view-2',
                _view: 2,
                fieldFilter: {
                  metadataSet: 'Employee Files',
                  metadataField: 'Status'
                }
              },
              {
                _key: 'view-3',
                _view: 3,
                fieldFilter: {
                  metadataSet: 'Employee Files',
                  metadataField: 'Company'
                }
              },
              {
                _key: 'view-4',
                _view: 4,
                fieldFilter: {
                  metadataSet: 'Employee Files',
                  metadataField: 'Employee ID'
                },
                displayName: [
                  {
                    metadataField: 'First Name'
                  },
                  {
                    literal: ' '
                  },
                  {
                    metadataField: 'Last Name'
                  }
                ]
              }
            ], {
              waitForSync: true,
              silent: false
            }).then((res) => {
              callback(null, user);
            }).catch(callback);
          },
          (user, callback) => {
            /**
             * Create a relation between our two example views
             */

            var db = new arangoDb.Database({
              url: sails.config.metadata.arangoDb.url
            });

            db.useDatabase(sails.config.metadata.arangoDb.database);
            db.useBasicAuth(sails.config.metadata.arangoDb.username, sails.config.metadata.arangoDb.password);

            const edgeCollection = db.edgeCollection(`structured-view-edges-${user.defaultAccount}`);

            edgeCollection.import([
              {
                _from: `structured-views-${user.defaultAccount}/view-2`,
                _to: `structured-views-${user.defaultAccount}/view-1`
              },
              {
                _from: `structured-views-${user.defaultAccount}/view-3`,
                _to: `structured-views-${user.defaultAccount}/view-2`
              },
              {
                _from: `structured-views-${user.defaultAccount}/view-4`,
                _to: `structured-views-${user.defaultAccount}/view-3`
              }
            ]).then((res) => {
              callback(null, user);
            }).catch(callback);
          },
          (user, callback) => {
            /**
             * Create some example pins
             */

            var db = new arangoDb.Database({
              url: sails.config.metadata.arangoDb.url
            });

            db.useDatabase(sails.config.metadata.arangoDb.database);
            db.useBasicAuth(sails.config.metadata.arangoDb.username, sails.config.metadata.arangoDb.password);

            const collection = db.collection(`metadata-pins-${user.defaultAccount}`);

            collection.import([
              {
                user: 1,
                metadataSet: 'Employee Files',
                metadataFields: [
                  'First Name',
                  'Last Name'
                ]
              }
            ]).then((res) => {
              callback();
            }).catch(callback);
          }
        ], callback);
      });
    }
  };
};
