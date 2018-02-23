/**
 * DocumentController
 *
 * @description :: Server-side logic for managing documents
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const skipperS3 = require('skipper-better-s3');
const path = require('path');
const uuid = require('uuid/v5');

module.exports = {
  browse: (req, res) => {
    res.view('pages/documents');
  },
  upload: (req, res) => {
    var empty = req.file('file')._files.length === 0;

    if (empty) {
      return res.status(403).send({
        message: 'A file must be attached'
      });
    }

    var filename = req.file('file')._files[0].stream.filename;
    var ext = path.extname(filename).slice(1);

    Document.create({
      name: path.basename(filename, ext),
      filetype: ext
    }).fetch().exec((err, document) => {
      if (err) {
        return res.status(500).send({
          message: err.message
        });
      }

      req.file('file').upload({
        adapter: skipperS3,
        key: sails.config.s3.key,
        secret: sails.config.s3.secret,
        bucket: sails.config.s3.bucket,
        region: 'us-west-2',
        s3params: {
          Key: 'queue/' + document.id + '.pdf'
        }
      }, (err, files) => {
        if (err) {
          return res.status(500).send({
            message: err.message
          });
        }

        res.status(200).send(files);
      });
    });
  }
};
