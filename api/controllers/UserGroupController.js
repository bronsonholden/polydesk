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
          User.findOne({
            id: req.param('user')
          }).populate('accounts', {
            id: req.session.account
          }).exec((err, user) => {
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
          }).exec((err, userGroup) => {
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
    }).intercept((err) => {
      res.status(500).send({
        message: err.message
      });
    }).exec((err, result) => {
      if (!err) {
        res.status(200).send(result);
      }
    });
  },
  create: (req, res) => {
    // unique(account, name)
    sails.getDatastore().transaction((db, callback) => {
      assert(req.session.account);

      async.waterfall([
        (callback) => {
          if (!req.param('name')) {
            return callback({
              code: 'E_MISSING_PARAM',
              message: 'User group name is required'
            });
          }

          callback();
        },
        (callback) => {
          UserGroup.findOne({
            account: req.session.account,
            name: req.param('name')
          }, (err, userGroup) => {
            if (err) {
              return callback(err);
            }

            if (userGroup) {
              return callback({
                code: 'E_USERGROUP_EXISTS',
                message: 'A user group with that name already exists in this account'
              });
            }

            callback();
          });
        },
        (callback) => {
          UserGroup.create({
            account: req.session.account,
            name: req.param('name')
          }).fetch().exec((err, userGroup) => {
            if (err) {
              return callback(err);
            }

            callback(null, userGroup);
          });
        },
        (userGroup, callback) => {
          Account.addToCollection(req.session.account, 'groups', userGroup.id).exec((err) => {
            if (err) {
              return callback(err);
            }

            callback(null, userGroup);
          });
        }
      ], (err, userGroup) => {
        if (err) {
          return callback(err);
        }

        callback(null, userGroup);
      });
    }).intercept('E_MISSING_PARAM', (err) => {
      return res.status(422).send({
        message: err.message
      })
    }).intercept('E_USERGROUP_EXISTS', (err) => {
      return res.status(409).send({
        message: err.message
      });
    }).intercept((err) => {
      return res.status(500).send({
        message: err.message
      });
    }).exec((err, userGroup) => {
      res.status(201).send(userGroup);
    });
  }
};
