/**
 * UserGroupController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const assert = require('assert');

module.exports = {
  add: (req, res) => {
    assert(req.session.account);

    sails.helpers.addUserToUserGroup.with({
      user: req.param('user'),
      userGroup: req.param('userGroup')
    }).intercept('E_INVALID_ARGINS', (err) => { // eslint-disable-line handle-callback-err
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
      noSuchUserGroup: (err) => {
        return res.status(404).send({
          message: err.message
        });
      },
      notInSameAccount: (err) => {
        return res.status(409).send({
          message: err.message
        });
      }
    });
  },
  create: (req, res) => {
    assert(req.session.account);

    sails.helpers.createNewUserGroup.with({
      account: req.session.account,
      name: req.param('name')
    }).intercept('E_INVALID_ARGINS', (err) => { // eslint-disable-line handle-callback-err
      return 'One or more validation errors occurred';
    }).switch({
      success: (userGroup) => {
        return res.status(201).send(userGroup);
      },
      error: (err) => {
        res.status(500).send({
          message: err.message,
          problems: err.problems
        });
      },
      userGroupAlreadyExists: (err) => {
        return res.status(409).send({
          message: err.message
        });
      },
      noSuchAccount: (err) => {
        return res.status(404).send({
          message: err.message
        });
      }
    });
  }
};
