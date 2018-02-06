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

      res.ok('pages/metadataGroups', {
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

      res.ok('pages/metadataGroupEdit', {
        metadataGroup: metadataGroup,
        metadataFields: metadataFields
      });
    });
  },
  fields: (req, res) => {
    var put = req.method === 'PUT';

    // req via web app comes in malformed
    if (!_.has(req.body, 'fields')) {
      // Updating via web always fully replaces existing field set
      put = true;

      const params = [
        'name',
        'type'
      ];

      // Ugh
      req.body = {
        fields: _.map(_.zip.apply(null, _.map(params, param => req.body[param])), obj => _.zipObject(params, obj))
      }
    }

    sails.helpers.setMetadataGroupFields.with({
      metadataGroup: req.param('metadataGroup'),
      metadataFields: req.body.fields,
      put: put
    }).switch({
      error: (err) => {
        return res.status(500).send({
          message: err.message
        });
      },
      success: (metadataGroup) => {
        return res.ok('pages/metadataGroupEdit', {
          metadataGroup: metadataGroup,
          metadataFields: req.body.fields
        });
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
        return res.created('pages/metadataGroups', metadataGroup);
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
