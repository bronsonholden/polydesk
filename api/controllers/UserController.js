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
        if (req.wantsJSON) {
          res.status(201).send(user);
        } else {
          res.redirect('/login');
        }
      },
      error: (err) => {
        res.serverError(err);
      },
      accountAlreadyExists: (err) => {
        return res.conflict('pages/signup', err);
      },
      userAlreadyExists: (err) => {
        return res.conflict('pages/signup', err);
      }
    });
  }
};
