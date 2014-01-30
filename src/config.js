var config = {}, base, local, _;
_ = require('underscore');

base = require('../config/base.js') || {};
local = require('../config/local.js') || {};

_.each(base, function (val, prop) {
  config[prop] = process.env[prop] || local[prop] || base[prop];
});

config.hostname = function () {
  return 'http://' + config.HOSTNAME + ':' + config.PORT;
};

module.exports = config;
