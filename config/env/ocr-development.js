const _ = require('lodash');
const env = require('./development');

env.models.migrate = 'safe';

var config = {

};

module.exports = _.merge(env, config);
