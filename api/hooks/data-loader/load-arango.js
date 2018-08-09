const fs = require('fs');
const path = require('path');
const async = require('async');

module.exports = (callback) => {
  const dir = path.join(process.cwd(), 'data/arango');

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

        switch (json.method) {
        case 'addObjectMetadataSet':
          async.eachSeries(json.documents, (doc, callback) => {
            sails.helpers.addObjectMetadataSet.with(doc).switch({
              success: (row) => {
                callback();
              },
              error: callback
            });
          }, callback);
          break;
        default:
          break;
        }
      }, callback);
    }
  ], callback);
};
