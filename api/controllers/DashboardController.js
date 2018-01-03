/**
 * DashboardController
 *
 * @description :: Server-side logic for managing dashboards
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  _config: {
    actions: false,
    shortcuts: false,
    rest: false
  },
  dashboard: (req, res) => {
    res.view('pages/dashboard');
  },
  documents: (req, res) => {
    res.view('pages/documents');
  }
};
