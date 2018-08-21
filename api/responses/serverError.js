module.exports = function (view, result) {
  var req = this.req;
  var res = this.res;

  if (req.wantsJSON || !view) {
    return res.status(500).json(result);
  } else {
    res.view(view, result);
  }
};
