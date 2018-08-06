/**
 *
 */


 const _ = require('lodash');
 const arangoDb = require('arangojs');
 const fs = require('fs');
 const loadModels = require('./load-models');
 const loadArango = require('./load-arango');

 module.exports = (sails) => {
   return {
     initialize: (callback) => {
       if (process.env.NODE_ENV === 'production' || !_.get(sails, 'config.polydesk.generateSampleData')) {
         return callback();
       }

       sails.after([
         'hook:orm:loaded',
         'hook:migrate-arangodb:loaded',
         'hook:dev-sample-data:loaded'
       ], () => {
         async.waterfall([
           loadModels,
           loadArango
         ], callback);
       });
     }
   };
 };
