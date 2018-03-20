/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {


  // Webpages

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': 'HomepageController.home',

  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/

  'get /login': {
    view: 'pages/login'
  },

  'get /signup': {
    view: 'pages/signup'
  },

  'post /login': 'AuthController.login',
  '/logout': 'AuthController.logout',

  'post /signup': 'UserController.create',

  'get /dashboard': 'DashboardController.dashboard',
  'get /documents': 'DocumentController.browse',

  'get /workflow': {
    view: 'pages/rpd',
    locals: {
      layout: 'layouts/workflow'
    }
  },

  'get /viewer/:document': 'DocumentController.view',

  'post /api/login': 'RESTAuthController.login',
  'post /api/logout': 'RESTAuthController.logout',
  'post /api/usergroup/add': 'UserGroupController.add',
  'post /api/activation': 'ActivationController.create',
  'get /api/activation/:activationToken': 'ActivationController.activate',
  'post /api/account/users': 'AccountController.addUser',
  'post /api/document': 'DocumentController.upload',
  'post /api/document/:documentId/metadata': 'DocumentController.updateMetadataSet',
  'put /api/document/:documentId/metadata': 'DocumentController.addMetadataSet',
  'delete /api/document/:documentId/metadata': 'DocumentController.removeMetadataSet'
  // Webhooks
  // Misc
};
