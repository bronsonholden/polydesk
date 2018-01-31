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
    sails.helpers.setMetadataGroupFields.with({
      metadataGroup: req.param('metadataGroup'),
      metadataFields: req.body.fields,
      put: req.method === 'PUT'
    }).switch({
      error: (err) => {
        return res.status(500).send({
          message: err.message
        });
      },
      success: (metadataGroup) => {
        return res.status(200).send(metadataGroup);
      },
      noSuchMetadataGroup: (err) => {
        return res.status(404).send({
          message: err.message
        });
      },
      fieldValidation: (err) => {
        return res.status(422).send({
          message: err.message
        });
      }
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
