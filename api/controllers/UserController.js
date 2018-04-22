/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  _config: {
    actions: false,
    shortcuts: false
  },
  create: (req, res) => {
    sails.helpers.createNewUser.with({
      email: req.param('email'),
      password: req.param('password')
    }).intercept('E_INVALID_ARGINS', (err) => { // eslint-disable-line handle-callback-err
      return 'One or more validation errors occurred';
    }).switch({
      success: (user) => {
        return res.status(201).send(user);
      },
      error: (err) => {
        res.status(500).send({
          message: err.message,
          problems: err.problems
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
