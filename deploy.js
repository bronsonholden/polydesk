const sails = require('sails');
const _ = require('lodash');

if (process.env.NODE_ENV !== 'deployment') {
  sails.log.error('Deployment run may only be executed in the `deployment` environment (NODE_ENV=development)');
  process.exit(1);
}

sails.load({
  hooks: {
    cors: false,
    csrf: false,
    grunt: false,
    http: false,
    i18n: false,
    policies: false,
    pubsub: false,
    request: false,
    responses: false,
    session: false,
    sockets: false,
    views: false
  },
  models: {
    migrate: 'alter'
  }
}, function (err, app) {
  if (err) {
    sails.log.error(err);
    process.exit(1);
  } else {
    sails.log.info('Deployment run complete');
    process.exit(0);
  }
});
