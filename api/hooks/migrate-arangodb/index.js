/**
 * ArangoDB migration hook
 *
 * Simple hook to migrate ArangoDB databases similarly to Sails migrations:
 *   - alter
 *   - safe
 *   - drop
 *
 * alter and safe simply leave the databases alone, while drop will delete
 * the database (if it exists) and create a fresh one.
 *
 * Like Sails, databases are NEVER dropped in the production environment.
 */

const arangoDb = require('arangojs');

module.exports = (sails) => {
  return {
    initialize: (callback) => {
      if (process.env.NODE_ENV === 'production' || _.get(sails, 'config.metadata.migrate') !== 'drop') {
        return callback();
      }

      sails.log.info(`·• ArangoDB ${sails.config.metadata.arangoDb.url} Auto-migration...  (drop)`);

      var db = new arangoDb.Database({
        url: sails.config.metadata.arangoDb.url
      });

      db.useBasicAuth(sails.config.metadata.arangoDb.username, sails.config.metadata.arangoDb.password);
      db.listDatabases().then((databases) => {
        if (databases.filter(db => db !== '_system').indexOf(sails.config.metadata.arangoDb.database) > -1) {
          return db.dropDatabase(sails.config.metadata.arangoDb.database);
        }
      }).then(() => {
        return db.createDatabase(sails.config.metadata.arangoDb.database);
      }).then(() => {
        sails.log.info(` ✓ ArangoDB ${sails.config.metadata.arangoDb.url} Auto-migration complete.`);
      }).then(callback).catch(callback);
    }
  };
};
