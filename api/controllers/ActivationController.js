/**
 * ActivationController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: (req, res) => {
    sails.helpers.sendActivationEmail.with({
      email: req.param('email'),
      expires: 3600
    }).intercept('E_INVALID_ARGINS', (err) => { // eslint-disable-line handle-callback-err
      return 'One or more validation errors occurred';
    }).switch({
      error: (err) => {
        res.serverError(null, {
          message: err.message,
          problems: err.problems
        });
      },
      success: (activation) => {
        res.ok(null, activation);
      },
      noSuchUser: (err) => {
        res.notFound(null, {
          message: err.message
        });
      },
      alreadyActivated: (err) => {
        res.conflict(null, {
          message: err.message
        });
      }
    });
  },
  activate: (req, res) => {
    res.ok(null, {
      message: 'Account acitvated'
    });
  }
};
