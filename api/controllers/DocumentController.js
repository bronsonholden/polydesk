/**
 * DocumentController
 *
 * @description :: Server-side logic for managing documents
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const skipperS3 = require('skipper-better-s3');
const path = require('path');
const AWS = require('aws-sdk');

module.exports = {
  browse: (req, res) => {
    Document.find({
      where: {
        account: req.session.account
      },
      skip: req.param('skip') || 0,
      limit: req.param('limit') || 20,
      sort: 'id ASC'
    }).exec((err, documents) => {
      if (err) {
        return res.status(500).send({
          message: err.message
        });
      }

      documents = documents.map((doc) => {
        return {
          id: doc.id,
          name: doc.name,
          fileType: doc.fileType,
          href: `/viewer/${doc.id}`
        };
      });

      res.view('pages/documents', {
        layout: 'layouts/documents',
        documents: documents
      });
    });
  },
  view: (req, res) => {
    var adapter = skipperS3({
      key: sails.config.documents.s3.key,
      secret: sails.config.documents.s3.secret,
      bucket: sails.config.documents.s3.bucket
    });

    async.waterfall([
      (callback) => {
        Document.findOne({
          account: req.session.account,
          id: req.param('document')
        }).exec((err, doc) => {
          if (err) {
            return callback(err);
          }

          if (!doc) {
            return callback(new Error('No document exists with that ID in this account'));
          }

          return callback(null, doc);
        });
      },
      (doc, callback) => {
        sails.helpers.getObjectMetadata.with({
          account: req.session.account,
          object: doc.id,
          objectType: 'document'
        }).switch({
          success: (metadataSets) => {
            callback(null, metadataSets);
          },
          error: (err) => {
            callback(err);
          },
          invalidObjectType: (err) => {
            callback(err);
          }
        });
      }
    ], (err, metadataSets) => {
      if (err) {
        return res.status(500).send({
          message: err.message
        });
      }

      return res.view('pages/viewer', {
        metadataSets: metadataSets,
        id: req.param('document'),
        layout: 'layouts/viewer',
        documentUrl: adapter.url('getObject', {
          s3params: {
            Key: `documents/${req.param('document')}/document.pdf`,
            Expires: 60
          }
        })
      });
    });
  },
  // Web-only action. Replaces metadata set in the viewer metadata tab
  applyMetadata: (req, res) => {
    var metadataSets = req.body.metadataSets;
    var metadataOrdering = req.body.metadataOrdering;

    // TODO: Transaction? Or add sets, then remove sets not updated?
    async.waterfall([
      (callback) => {
        sails.helpers.removeAllObjectMetadataSets.with({
          account: req.session.account,
          object: req.param('document'),
          objectType: 'document'
        }).switch({
          success: (metadata) => {
            callback();
          },
          error: (err) => {
            callback(err);
          },
          invalidObjectType: (err) => {
            callback(err);
          }
        });
      },
      (callback) => {
        async.eachOf(metadataSets, (metadata, setName, callback) => {
          var order = metadataOrdering.indexOf(setName);

          if (order < 0) {
            return callback(new Error('Metadata set not ordered'));
          }

          sails.helpers.addObjectMetadataSet.with({
            account: req.session.account,
            object: req.param('document'),
            objectType: 'document',
            setName: setName,
            order: order,
            metadata: metadata
          }).switch({
            success: (metadata) => {
              callback();
            },
            error: (err) => {
              callback(err);
            },
            invalidObjectType: (err) => {
              callback(err);
            }
          });
        }, callback);
      }
    ], (err) => {
      if (err) {
        return res.status(500).send({
          message: err.message
        });
      }

      if (req.body.save) {
        res.redirect('/documents');
      } else {
        res.send({
          success: true,
          message: 'Metadata applied'
        });
      }
    });
  },
  upload: (req, res) => {
    var empty = req.file('file')._files.length === 0;

    if (empty) {
      return res.status(403).send({
        message: 'A file must be attached'
      });
    }

    var filename = req.file('file')._files[0].stream.filename;
    var ext = path.extname(filename);

    Document.create({
      name: path.basename(filename, ext),
      account: req.session.account,
      fileType: ext.slice(1) // so we don't get the dot before extension
    }).fetch().exec((err, file) => {
      if (err) {
        return res.status(500).send({
          message: err.message
        });
      }

      req.file('file').upload({
        adapter: skipperS3,
        key: sails.config.documents.s3.key,
        secret: sails.config.documents.s3.secret,
        bucket: sails.config.documents.s3.bucket,
        region: 'us-west-2',
        s3params: {
          Key: 'queue/' + file.id + '.pdf'
        }
      }, (err, files) => {
        if (err) {
          return res.status(500).send({
            message: err.message
          });
        }

        var sqs = new AWS.SQS({
          accessKeyId: sails.config.documents.sqs.key,
          secretAccessKey: sails.config.documents.sqs.secret,
          region: sails.config.documents.sqs.region
        });

        sqs.sendMessage({
          QueueUrl: sails.config.documents.sqs.url,
          MessageBody: JSON.stringify({
            document: file
          }),
          MessageGroupId: 'DocumentUpload'
        }, (err, data) => {
          if (err) {
            return res.status(500).send({
              message: err.message
            });
          }

          res.redirect('/documents');
        });
      });
    });
  },
  addMetadataSet: (req, res) => {
    sails.helpers.addObjectMetadataSet.with({
      account: req.session.account,
      object: req.param('documentId'),
      objectType: 'document',
      setName: req.body.setName,
      metadata: req.body.metadata
    }).switch({
      success: (data) => {
        return res.status(201).send(data);
      },
      error: (err) => {
        return res.status(500).send({
          message: err.message
        });
      },
      invalidObjectType: (err) => {
        return res.status(403).send({
          message: err.message
        });
      }
    });
  },
  updateMetadataSet: (req, res) => {
    sails.helpers.updateObjectMetadataSet.with({
      account: req.session.account,
      object: req.param('documentId'),
      objectType: 'document',
      setName: req.body.setName,
      metadata: req.body.metadata
    }).switch({
      success: (data) => {
        return res.status(200).send(data);
      },
      error: (err) => {
        return res.status(500).send({
          message: err.message
        });
      },
      invalidObjectType: (err) => {
        return res.status(403).send({
          message: err.message
        });
      }
    });
  },
  removeMetadataSet: (req, res) => {
    sails.helpers.removeObjectMetadataSet.with({
      account: req.session.account,
      object: req.param('documentId'),
      objectType: 'document',
      setName: req.body.setName
    }).switch({
      success: (data) => {
        return res.status(200).send(data);
      },
      error: (err) => {
        return res.status(500).send({
          message: err.message
        });
      },
      invalidObjectType: (err) => {
        return res.status(403).send({
          message: err.message
        });
      }
    });
  }
};
