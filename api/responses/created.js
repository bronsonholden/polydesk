module.exports = function (view, result) {
  var req = this.req;
  var res = this.res;

  if (req.wantsJSON) {
    return res.status(201).json(result);
  } else {
    res.view(view, result);
  }
};
