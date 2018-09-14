const os = require('os');
const path = require('path').posix;
const shipitDeploy = require('shipit-deploy');

module.exports = (shipit) => {
  shipitDeploy(shipit);

  shipit.initConfig({
    default: {
      shallowClone: true,
      deployTo: '/home/ubuntu/polydesk',
      repositoryUrl: 'https://github.com/paulholden2/polydesk.git',
      ignores: [
        '.git',
        '.tmp',
        'node_modules'
      ],
      keepReleases: 10,
      key: `${os.homedir()}/.ssh/key-polydesk-dev-01.pem`
    },
    production: {
      servers: 'ubuntu@polydesk.io'
    }
  });
};
