module.exports = {
  apps: [
    {
      name: 'polydesk',
      script: './app.js',
      cwd: '/var/www/polydesk',
      watch: true,
      env_production: {
        'sails_hooks__grunt': false,
        'NODE_ENV': 'production'
      }
    }
  ]
};
