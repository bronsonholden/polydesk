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
          Account.create({
            name: req.param('email')
          }).fetch().exec((err, account) => {
            if (err) {
              return callback(err);
            }

            callback(null, account);
          });
        },
        (account, callback) => {
          User.create({
            email: req.param('email'),
            password: req.param('password'),
            defaultAccount: account.id
          }).fetch().exec((err, user) => {
              if (err) {
                return callback(err);
              }

              callback(null, user, account);
          });
        },
        (user, account, callback) => {
          var arr = [
            'can_login',
            'view_documents'
          ].map((cap) => {
            return {
              name: cap,
              user: user.id,
              account: account.id
            }
          });

          Capability.createEach(arr).exec((err) => {
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
        message: err.message
      });
    }).exec((err, user) => {
      res.status(201).send(user);
    });
  }
};
