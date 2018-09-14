module.exports = {
  apps: [
    {
      name: 'polydesk',
      script: './app.js',
      cwd: '/home/ubuntu/polydesk/current',
      watch: true,
      env_production: {
        'sails_hooks__grunt': false,
        'NODE_ENV': 'production'
      }
    }
  ]
};
