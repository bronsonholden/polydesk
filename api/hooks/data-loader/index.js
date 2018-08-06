/**
 * Load sample data from files
 */

const _ = require('lodash');
const loadModels = require('./load-models');
const loadArango = require('./load-arango');

module.exports = (sails) => {
  return {
    initialize: (callback) => {
      if (process.env.NODE_ENV === 'production' || !_.get(sails, 'config.polydesk.generateSampleData')) {
        return callback();
      }

      sails.log.info(`·• data-loader: Loading sample data...`);

      sails.after([
        'hook:orm:loaded',
        'hook:migrate-arangodb:loaded',
        'hook:dev-sample-data:loaded'
      ], () => {
        async.waterfall([
          loadModels,
          loadArango
        ], (err) => {
          if (err) {
            return callback(err);
          }

          sails.log.info(`·• data-loader: Done!`);
        });
      });
    }
  };
};
