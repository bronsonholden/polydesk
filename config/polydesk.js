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
  // The file types allowed to be uploaded as documents
  supportedFileTypes: [
    'pdf',
    'txt',
    'csv',
    'json',
    'xml'
  ]
};
