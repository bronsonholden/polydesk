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
    sails.helpers.createNewUser.with({
      email: req.param('email'),
      password: req.param('password')
    }).switch({
      success: (user) => {
        return res.status(201).send(user);
      },
      error: (err) => {
        res.status(500).send({
          message: err.message
        });
      },
      accountAlreadyExists: (err) => {
        return res.status(409).send({
          message: err.message
        });
      },
      userAlreadyExists: (err) => {
        return res.status(409).send({
          message: err.message
        });
      }
    });
  }
};
