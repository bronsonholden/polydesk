module.exports = (req, res, next) => {
  Capability.findOne({
    account: req.session.account,
    user: req.session.user,
    name: 'upload_documents'
  }, (err, capability) => {
    if (err) {
      return res.serverError(err);
    }

    if (!capability) {
      return res.status(403).send({
        message: 'Your account does not have permission to upload documents'
      });
    }

    next();
  });
};
