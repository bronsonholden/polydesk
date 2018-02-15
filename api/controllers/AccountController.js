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
    }).intercept('E_INVALID_ARGINS', (err) => {
      return 'One or more validation errors occurred';
    }).switch({
      success: (user) => {
        return res.status(200).send(user);
      },
      error: (err) => {
        return res.status(500).send({
          message: err.message,
          problems: err.problems
        });
      },
      noSuchUser: (err) => {
        return res.status(404).send({
          message: err.message
        });
      },
      noSuchAccount: (err) => {
        return res.status(404).send({
          message: err.message
        });
      },
      alreadyInAccount: (err) => {
        return res.status(409).send({
          message: err.message
        });
      }
    });
  }
};
