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
    }).switch({
      error: (err) => {
        res.status(500).send({
          message: err.message
        });
      },
      success: (activation) => {
        res.status(200).send(activation);
      },
      noSuchUser: (err) => {
        res.status(404).send({
          message: err.message
        });
      },
      alreadyActivated: (err) => {
        res.status(409).send({
          message: err.message
        });
      }
    });
  },
  activate: (req, res) => {
    res.status(200).send('ok');
  }
};
