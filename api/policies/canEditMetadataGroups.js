module.exports = (req, res, next) => {
  Capability.findOne({
    account: req.session.account,
    user: req.session.user,
    name: 'edit_metadata_groups'
  }, (err, capability) => {
    if (err) {
      return res.status(500).send(err);
    }

    if (!capability) {
      return res.status(403).send({
        message: 'You do not have permission to create or edit metadata groups in this account'
      });
    }

    next();
  });
};
