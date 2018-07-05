/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  // '*': true,

  'DashboardController': {
    '*': [ 'notBusy', 'isAuthenticated' ]
  },
  'DocumentController': {
    'browse': [ 'notBusy', 'isAuthenticated', 'canViewDocuments' ],
    'upload': [ 'notBusy', 'isAuthenticated', 'canUploadDocuments' ],
    'view': [ 'notBusy', 'isAuthenticated', 'canViewDocuments' ],
    'addMetadataSet': [ 'notBusy', 'isAuthenticated', 'canAddDocumentMetadataSets' ],
    'updateMetadataSet': [ 'notBusy', 'isAuthenticated', 'canUpdateDocumentMetadataSets' ],
    'removeMetadataSet': [ 'notBusy', 'isAuthenticated', 'canRemoveDocumentMetadataSets' ]
  },
  'StructuredViewController': {
    'generate': [ 'notBusy', 'isAuthenticated', 'canViewDocuments' ]
  }
};
