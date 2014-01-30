var redis = require('redis')
  , config = require('../config');

module.exports = function (server) {
  server.set('db', redis.createClient(config.DB_PORT, config.DB_HOST));
};
