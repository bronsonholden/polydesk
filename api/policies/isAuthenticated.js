module.exports = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    if (!req.wantsJSON) {
      res.redirect('/login?next=' + req.path);
    } else {
      res.status(403).send({
        message: 'Login required'
      });
    }
  }
};
