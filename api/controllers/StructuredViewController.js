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
        Document.find({
          where: {
            id: view.documents.slice(0, 20)
          }
        }).exec((err, documents) => {
          if (err) {
            return res.send(err);
          }

          documents = documents.map((doc) => {
            return {
              id: doc.id,
              name: doc.name,
              fileType: doc.fileType,
              href: `/viewer/${doc.id}`
            };
          });

          res.view('pages/documents', {
            layout: 'layouts/documents',
            documents: documents
          });
        });
      },
      error: (err) => {
        res.send(err);
      }
    });
  }
};
