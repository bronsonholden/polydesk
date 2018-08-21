/**
 * WorkflowController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: (req, res) => {
    // Stub
    res.ok('pages/dashboard', {
      message: 'Workflow created'
    });
  },
  edit: (req, res) => {
    res.view('pages/workflow');
  }
};
