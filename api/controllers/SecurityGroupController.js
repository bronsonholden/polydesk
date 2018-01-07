/**
 * SecurityGroupController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: (req, res) => {
    // unique(account, name)
    sails.getDatastore().transaction((db, callback) => {
      assert(req.session.account);

      async.waterfall([
        (callback) => {
          if (!req.param('name')) {
            return callback({
              code: 'E_MISSING_PARAM',
              message: 'Security group name is required'
            });
          }

          callback();
        },
        (callback) => {
          SecurityGroup.findOne({
            account: req.session.account,
            name: req.param('name')
          }, (err, securityGroup) => {
            if (err) {
              return callback(err);
            }

            if (securityGroup) {
              return callback({
                code: 'E_SECURITYGROUP_EXISTS',
                message: 'A security group with that name already exists in this account'
              });
            }

            callback();
          });
        },
        (callback) => {
          SecurityGroup.create({
            account: req.session.account,
            name: req.param('name')
          }).fetch().exec((err, securityGroup) => {
            if (err) {
              return callback(err);
            }

            callback(null, securityGroup);
          });
        }
      ], (err, securityGroup) => {
        if (err) {
          return callback(err);
        }

        callback(null, securityGroup);
      })
    }).intercept('E_MISSING_PARAM', (err) => {
      return res.status(422).send({
        message: err.message
      })
    }).intercept('E_SECURITYGROUP_EXISTS', (err) => {
      return res.status(409).send({
        message: err.message
      });
    }).intercept((err) => {
      return res.status(500).send({
        message: err.message
      });
    }).exec((err, securityGroup) => {
      res.status(201).send(securityGroup);
    });
  }
};
