module.exports = function (view, err) {
  var req = this.req;
  var res = this.res;

  if (!err) {
    err = view;
    view = null;
  }

  if (req.wantsJSON && !view) {
    return res.status(401).json(err);
  } else {
    res.view(view, {
      err: err
    });
  }
};
