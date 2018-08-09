/**
 * Polydesk configuration
 *
 * General configuration for various Polydesk features.
 */

module.exports.polydesk = {
  // The default number of seconds after which an activation instance expires
  defaultActivationExpires: 3600,
  // Should sample data be generated when Sails is lifted?
  generateSampleData: true,
  // Should sample data be loaded from files via data-loader when Sails is lifted?
  loadSampleData: true,
  // The file types allowed to be uploaded as documents
  supportedFileTypes: [
    'pdf',
    'txt',
    'csv',
    'json',
    'xml',
    'xls',
    'xslx',
    'ppt',
    'doc',
    'docx'
  ]
};
