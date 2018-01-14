/**
 * WorkflowController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: (req, res) => {
    // Stub
    res.status(200).send('ok');
  },
  edit: (req, res) => {
    res.view('pages/workflow');
  }
};
