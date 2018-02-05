const tooBusy = require('node-toobusy');

module.exports = (req, res, next) => {
  if (tooBusy()) {
    res.status(503).send({
      message: 'The server is too busy'
    });
  } else {
    next();
  }
};
