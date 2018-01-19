/**
 * MetadataGroupController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const assert = require('assert');

module.exports = {
  groups: (req, res) => {
    MetadataGroup.find({
      account: req.session.account
    }).exec((err, metadataGroups) => {
      if (err) {
        return res.send(err);
      }

      res.view('pages/metadataGroups', {
        metadataGroups: metadataGroups
      });
    });
  },
  edit: (req, res) => {
    async.waterfall([
      (callback) => {
        MetadataGroup.findOne({
          id: req.param('metadataGroup'),
          account: req.session.account
        }).exec((err, metadataGroup) => {
          if (err) {
            return res.send(err);
          }

          callback(null, metadataGroup, []);
        });
      },
      (metadataGroup, metadataFields, callback) => {
        MetadataStringField.find({
          metadataGroup: metadataGroup.id
        }).exec((err, stringFields) => {
          if (err) {
            return callback(err);
          }

          callback(null, metadataGroup, metadataFields.concat(stringFields));
        });
      },
      (metadataGroup, metadataFields, callback) => {
        callback(null, metadataGroup, metadataFields.map(f => f.toJSON()));
      },
      (metadataGroup, metadataFields, callback) => {
        callback(null, metadataGroup, _.sortBy(metadataFields, 'fieldIndex'));
      }
    ], (err, metadataGroup, metadataFields) => {
      if (err) {
        return res.send(err);
      }

      res.view('pages/metadataGroupEdit', {
        metadataGroup: metadataGroup,
        metadataFields: metadataFields
      });
    });
  },
  fields: (req, res) => {
    sails.getDatastore().transaction((db, callback) => {
      assert(req.session.account);

      async.waterfall([
        (callback) => {
          if (!req.param('metadataGroup')) {
            var e = new Error('Metadata group ID is required');
            e.code = 'E_MISSING_PARAM';
            return callback(e);
          }

          callback();
        },
        (callback) => {
          MetadataGroup.findOne({
            id: req.param('metadataGroup'),
            account: req.session.account
          }).usingConnection(db).exec((err, metadataGroup) => {
            if (err) {
              return callback(err);
            }

            if (!metadataGroup) {
              var e = new Error('Metadata group does not exist in this account');
              e.code = 'E_MISSING';
              return callback(e);
            }

            callback(null, metadataGroup);
          });
        },
        (metadataGroup, callback) => {
          // PUT requests overwrite any existing fields for the group
          if (req.method === 'PUT') {
            MetadataStringField.destroy({
              metadataGroup: metadataGroup.id
            }).usingConnection(db).exec((err, removed) => {
              if (err) {
                return callback(err);
              }

              callback(null, metadataGroup);
            });
          } else {
            callback(null, metadataGroup);
          }
        },
        (metadataGroup, callback) => {
          async.eachOfSeries(req.body.fields.filter(f => f.type === 'string'), (field, idx, callback) => {
            MetadataStringField.create({
              metadataGroup: metadataGroup.id,
              name: field.name,
              fieldIndex: idx
            }).usingConnection(db).exec((err) => {
              callback(err);
            });
          }, (err) => {
            if (err) {
              return callback(err);
            }

            callback(null, metadataGroup);
          });
        }
      ], (err, metadataGroup) => {
        if (err) {
          return callback(err);
        }

        callback(null, metadataGroup);
      })
    }).intercept('E_MISSING_PARAM', (err) => {
      res.status(422).send({
        message: err.message
      });
    }).intercept('E_MISSING', (err) => {
      res.status(404).send({
        message: err.message
      });
    }).exec((err, metadataGroup) => {
      res.status(200).send(metadataGroup);
    });
  },
  create: (req, res) => {
    sails.helpers.createMetadataGroup.with({
      account: req.session.account,
      name: req.param('name')
    }).switch({
      error: (err) => {
        return res.status(500).send({
          message: err.message
        });
      },
      success: (metadataGroup) => {
        return res.status(201).send(metadataGroup);
      },
      alreadyExists: (err) => {
        return res.status(409).send({
          message: err.message
        });
      },
      noSuchAccount: (err) => {
        return res.status(404).send({
          message: err.message
        });
      }
    });
  }
};
