/**
 * StructuredViewController
 *
 * @description :: Server-side logic for managing structured views
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  _config: {
    actions: false,
    shortcuts: false
  },
  generate: (req, res) => {
    var viewId = req.param('view');
    var accountId = req.session.account;

    sails.helpers.generateStructuredView.with({
      view: viewId,
      account: accountId
    }).switch({
      success: (view) => {
        res.send(view);
      },
      error: (err) => {
        res.send(err);
      }
    });
  }
};
