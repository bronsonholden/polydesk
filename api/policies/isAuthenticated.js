const querystring = require('querystring');

module.exports = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    if (!req.wantsJSON) {
      res.redirect('/login');
    } else {
      res.status(403).send({
        message: 'Login required'
      });
    }
  }
};
