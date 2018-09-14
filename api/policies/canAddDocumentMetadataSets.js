module.exports = (req, res, next) => {
  Capability.findOne({
    account: req.session.account,
    user: req.session.user,
    name: 'add_document_metadata_sets'
  }, (err, capability) => {
    if (err) {
      return res.serverError(err);
    }

    if (!capability) {
      return res.status(403).send({
        message: 'You do not have permission to add metadata sets to documents in this account'
      });
    }

    next();
  });
};
