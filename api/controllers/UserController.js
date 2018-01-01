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
    User.create({
      email: req.param('email'),
      password: req.param('password')
    }).fetch().exec((err, user) => {
        if (err) {
          return res.status(500).send(err);
        }

        res.status(201).send(user);
    });
  }
};
