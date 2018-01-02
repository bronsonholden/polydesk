/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const async = require('async');

module.exports = {
	_config: {
    actions: false,
    shortcuts: false
  },
  create: (req, res) => {
    sails.getDatastore().transaction((db, callback) => {
      async.waterfall([
        (callback) => {
          User.findOne({
            email: req.param('email')
          }).exec((err, user) => {
            if (err) {
              return callback(err);
            }

            if (user) {
              var e = new Error();
              e.code = 'E_EMAIL_EXISTS';
              return callback(e);
            }

            callback();
          });
        },
        (callback) => {
          User.create({
            email: req.param('email'),
            password: req.param('password')
          }).fetch().exec((err, user) => {
              if (err) {
                return callback(err);
              }

              callback(null, user);
          });
        },
        (user, callback) => {
          Account.create({
            name: req.param('email')
          }).fetch().exec((err, account) => {
            if (err) {
              return callback(err);
            }

            callback(null, user, account);
          });
        },
        (user, account, callback) => {
          Capability.create({
            name: 'can_login',
            user: user.id,
            account: account.id
          }).exec((err) => {
            if (err) {
              return callback(err);
            }

            callback(null, user);
          });
        }
      ], (err, user) => {
        if (err) {
          return callback(err);
        }

        callback(null, user);
      });
    }).intercept('E_EMAIL_EXISTS', (err) => {
      res.status(409).send({
        message: 'An account with that email address already exists'
      });
    }).intercept((err) => {
      res.status(500).send({
        message: 'An unexpected server error occurred'
      });
    }).exec((err, user) => {
      res.status(201).send(user);
    });
  }
};
