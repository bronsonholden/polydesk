/**
 * AccountController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  _config: {
    actions: false,
    shortcuts: false,
    rest: true
  },
  addUser: (req, res) => {
    sails.helpers.addUserToAccount.with({
      user: req.param('user'),
      account: req.session.account
    }).intercept('E_INVALID_ARGINS', (err) => { // eslint-disable-line handle-callback-err
      return 'One or more validation errors occurred';
    }).switch({
      success: (user) => {
        return res.ok('pages/dashboard', user);
      },
      error: (err) => {
        return res.serverError('pages/dashboard', {
          message: err.message,
          problems: err.problems
        });
      },
      noSuchUser: (err) => {
        return res.notFound('pages/dashboard', {
          message: err.message
        });
      },
      noSuchAccount: (err) => {
        return res.notFound('pages/dashboard', {
          message: err.message
        });
      },
      alreadyInAccount: (err) => {
        return res.conflict('pages/dashboard', {
          message: err.message
        });
      }
    });
  }
};
