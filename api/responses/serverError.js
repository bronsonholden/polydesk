module.exports = function (err) {
  var req = this.req;
  var res = this.res;

  if (req.wantsJSON) {
    return res.status(500).json(err);
  } else {
    res.view('500', {
      err: err
    });
  }
};
