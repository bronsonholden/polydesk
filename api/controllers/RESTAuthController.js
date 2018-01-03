/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const sails = require('sails');
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
        return res.status(500).send(err);
      }

      if (!user) {
        return res.status(401).set('WWW-Authenticate', `Basic`).send(info);
      }

      req.login(user, (err) => {
        if (err) {
          return res.status(500).send(err);
        }

        req.session.user = user.id;
        req.session.account = user.defaultAccount;

        res.status(200).send(info);
      });
    })(req, res);
  },
  logout: (req, res) => {
    req.logout();
    res.ok({
      message: 'Logout successful'
    });
  }
};
