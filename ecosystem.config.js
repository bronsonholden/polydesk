module.exports = {
  apps: [
    {
      name: 'polydesk',
      script: './app.js',
      cwd: '/home/ubuntu/polydesk',
      watch: true,
      env_production: {
        'NODE_ENV': 'production'
      },
      ignoreWatch: [
        '.tmp'
      ]
    }
  ]
};
