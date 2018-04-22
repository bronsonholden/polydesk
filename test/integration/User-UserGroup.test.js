const sails = require('sails');
const async = require('async');
const { describe, it, before } = require('mocha');

describe('User-UserGroup', function () {
  var inputs = {};

  this.timeout(60000);

  before(function (done) {
    this.timeout(60000);

    async.waterfall([
      (callback) => {
        sails.helpers.createNewUserAndAccount.with({
          email: 'user+usergroup@polydesk.com',
          password: 'user+usergroup'
        }).switch({
          success: (user) => {
            callback(null, user);
          },
          error: callback
        });
      },
      (user, callback) => {
        sails.helpers.createNewUserGroup.with({
          name: 'usergroup',
          account: user.defaultAccount
        }).switch({
          success: (userGroup) => {
            callback(null, user, userGroup);
          },
          error: callback
        });
      },
      (user, userGroup, callback) => {
        inputs.user = user;
        inputs.userGroup = userGroup;
        callback();
      }
    ], done);
  });

  it('helper: add-user-to-user-group', function (done) {
    sails.helpers.addUserToUserGroup.with({
      user: inputs.user.id,
      userGroup: inputs.userGroup.id
    }).switch({
      success: () => {
        done();
      },
      error: done
    });
  });

  // it('removes User from UserGroup', function (done) {
  //   done();
  // })
});
