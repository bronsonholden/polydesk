const tooBusy = require('node-toobusy');

module.exports = (req, res, next) => {
  console.log(tooBusy.lag());
  if (tooBusy()) {
    res.status(503).send({
      message: 'The server is too busy'
    });
  } else {
    next();
  }
};
