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
      noSuchUserGroup: (err) => {
        return res.notFound('pages/dashboard', {
          message: err.message
        });
      },
      notInSameAccount: (err) => {
        return res.conflict('pages/dashboard', {
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
        return res.created('pages/dashboard', userGroup);
      },
      error: (err) => {
        res.serverError('pages/dashboard', {
          message: err.message,
          problems: err.problems
        });
      },
      userGroupAlreadyExists: (err) => {
        return res.conflict('pages/dashboard', {
          message: err.message
        });
      },
      noSuchAccount: (err) => {
        return res.notFound('pages/dashboard', {
          message: err.message
        });
      }
    });
  }
};
