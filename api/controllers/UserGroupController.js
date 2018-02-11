/**
 * UserGroupController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const assert = require('assert');

module.exports = {
  add: (req, res) => {
    sails.getDatastore().transaction((db, callback) => {
      assert(req.session.account);
      assert(req.param('user'));
      assert(req.param('userGroup'));

      async.waterfall([
        (callback) => {
          if (!req.param('user')) {
            var e = new Error('User ID is required');
            e.code = 'E_MISSING_PARAM';
            return callback(e);
          }

          if (!req.param('userGroup')) {
            var e = new Error('User group ID is required');
            e.code = 'E_MISSING_PARAM';
            return callback(e);
          }

          callback();
        },
        (callback) => {
          User.findOne({
            id: req.param('user')
          }).populate('accounts', {
            id: req.session.account
          }).usingConnection(db).exec((err, user) => {
            if (err) {
              return callback(err);
            }

            if (!user) {
              var e = new Error('User does not exist in this account');
              e.code = 'E_MISSING';
              return callback(e);
            }

            callback(null, user);
          });
        },
        (user, callback) => {
          UserGroup.findOne({
            id: req.param('userGroup'),
            account: req.session.account
          }).usingConnection(db).exec((err, userGroup) => {
            if (err) {
              return callback(err);
            }

            if (!userGroup) {
              var e = new Error('User group does not exist in this account');
              e.code = 'E_MISSING';
              return callback(e);
            }

            callback(null, user, userGroup);
          });
        }
      ], (err, user, userGroup) => {
        if (err) {
          return callback(err);
        }

        callback(null, {
          user: user,
          userGroup: userGroup
        });
      });
    }).intercept('E_MISSING', (err) => {
      res.status(404).send({
        message: err.message
      });
    }).intercept('E_MISSING_PARAM', (err) => {
      res.status(422).send({
        message: err.message
      });
    }).intercept((err) => {
      res.status(500).send({
        message: err.message
      });
    }).exec((err, result) => {
      res.status(200).send(result);
    });
  },
  create: (req, res) => {
    assert(req.session.account);

    sails.helpers.createUserGroup.with({
      account: req.session.account,
      name: req.param('name')
    }).switch({
      success: (userGroup) => {
        return res.status(201).send(userGroup);
      },
      error: (err) => {
        res.status(500).send({
          message: err.message
        });
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
