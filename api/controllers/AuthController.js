/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const passport = require('passport');

module.exports = {
  _config: {
    actions: false,
    shortcuts: false,
    rest: false
  },
  login: (req, res) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return res.serverError(err);
      }

      if (!user) {
        return res.unauthorized('pages/login', info);
      }

      req.login(user, (err) => {
        if (err) {
          return res.serverError(err);
        }

        req.session.user = user.id;
        req.session.account = user.defaultAccount;

        res.redirect(req.query.next || '/dashboard');
      });
    })(req, res);
  },
  logout: (req, res) => {
    req.logout();
    res.redirect('/');
  }
};
