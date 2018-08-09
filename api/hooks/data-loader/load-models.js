const fs = require('fs');
const path = require('path');
const async = require('async');

module.exports = (callback) => {
  const dir = path.join(process.cwd(), 'data/models');

  async.waterfall([
    (callback) => {
      fs.readdir(dir, callback);
    },
    (listing, callback) => {
      async.eachSeries(listing, (file, callback) => {
        var filePath = path.join(dir, file);

        if (fs.lstatSync(filePath).isDirectory()) {
          return callback();
        }

        var json = JSON.parse(fs.readFileSync(filePath).toString());

        var model = sails.models[json.model];

        model.createEach(json.data).exec(callback);
      }, callback);
    }
  ], callback);
};
