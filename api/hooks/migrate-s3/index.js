/**
 * S3 migration hook
 *
 * Simple hook to remove all documents from the S3 bucket configured for
 * document storage. Uses the same options for migration as Sails models:
 *   - alter
 *   - safe
 *   - drop
 *
 * alter and safe simply leave any documents in S3, while `drop` removes
 * everything under the documents/ prefix.
 *
 * Like Sails, documents are NEVER dropped in the production environment.
 */

const AWS = require('aws-sdk');

module.exports = (sails) => {
  return {
    initialize: (callback) => {
      async.waterfall([
        (callback) => {
          if (process.env.NODE_ENV === 'production' || _.get(sails, 'config.documents.migrate') !== 'drop') {
            return callback();
          }

          sails.log.info(`·• s3://${sails.config.documents.s3.bucket} Auto-migration...  (drop)`);

          var s3 = new AWS.S3({
            accessKeyId: sails.config.documents.s3.key,
            secretAccessKey: sails.config.documents.s3.secret
          });

          var results;

          async.doUntil((callback) => {
            s3.listObjects({
              Bucket: sails.config.documents.s3.bucket,
              Prefix: 'documents/',
              MaxKeys: 100
            }, (err, data) => {
              if (err) {
                return callback(err);
              }

              results = data.Contents.length;

              if (results > 0) {
                s3.deleteObjects({
                  Bucket: sails.config.documents.s3.bucket,
                  Delete: {
                    Objects: data.Contents.map((obj) => {
                      return {
                        Key: obj.Key
                      };
                    })
                  }
                }, (err) => {
                  if (err) {
                    return callback(err);
                  }

                  callback();
                });
              } else {
                return callback();
              }
            });
          }, () => results === 0, (err) => {
            if (err) {
              return callback(err);
            }

            sails.log.info(` ✓ s3://${sails.config.documents.s3.bucket} Auto-migration complete.`);
            callback();
          });
        }
      ], callback);
    }
  };
};
