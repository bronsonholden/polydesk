/**
 * MetadataGroupController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const assert = require('assert');

module.exports = {
  create: (req, res) => {
    // unique(account, name)
    sails.getDatastore().transaction((db, callback) => {
      assert(req.session.account);

      async.waterfall([
        (callback) => {
          if (!req.param('name')) {
            return callback({
              code: 'E_MISSING_PARAM',
              message: 'Metadata group name is required'
            });
          }

          callback();
        },
        (callback) => {
          MetadataGroup.findOne({
            account: req.session.account,
            name: req.param('name')
          }, (err, metadatagroup) => {
            if (err) {
              return callback(err);
            }

            if (metadatagroup) {
              return callback({
                code: 'E_METADATAGROUP_EXISTS',
                message: 'A metadata group with that name already exists in this account'
              });
            }

            callback();
          });
        },
        (callback) => {
          MetadataGroup.create({
            account: req.session.account,
            name: req.param('name')
          }).fetch().exec((err, metadatagroup) => {
            if (err) {
              return callback(err);
            }

            callback(null, metadatagroup);
          });
        }
      ], (err, metadatagroup) => {
        if (err) {
          return callback(err);
        }

        callback(err, metadatagroup);
      })
    }).intercept('E_MISSING_PARAM', (err) => {
      return res.status(422).send({
        message: err.message
      })
    }).intercept('E_METADATAGROUP_EXISTS', (err) => {
      return res.status(409).send({
        message: err.message
      });
    }).intercept((err) => {
      return res.status(500).send({
        message: err.message
      });
    }).exec((err, metadatagroup) => {
      res.status(201).send(metadatagroup);
    });
  }
};
