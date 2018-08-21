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
    sails.helpers.createNewUserAndAccount.with({
      email: req.param('email'),
      password: req.param('password')
    }).intercept('E_INVALID_ARGINS', (err) => { // eslint-disable-line handle-callback-err
      return 'One or more validation errors occurred';
    }).switch({
      success: (user) => {
        res.created('pages/homepage', user);
      },
      error: (err) => {
        res.serverError('pages/homepage', {
          message: err.message,
          problems: err.problems
        });
      },
      accountAlreadyExists: (err) => {
        return res.conflict('pages/homepage', {
          message: err.message
        });
      },
      userAlreadyExists: (err) => {
        return res.conflict('pages/homepage', {
          message: err.message
        });
      }
    });
  }
};
