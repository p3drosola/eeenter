var tumblr = require('tumblr.js')
  , path = require('path')
  , config = require('../config');


if (!config.CONSUMER_KEY || !config.CONSUMER_SECRET) {
  throw new Error('Missing tumblr config ENV variables. Check the readme.');
}

module.exports = function (server) {
  return function (req, res, next) {
    req.tumblr = tumblr.createClient({
      consumer_key: config.CONSUMER_KEY,
      consumer_secret: config.CONSUMER_SECRET,
      token: req.user.tumblr_token,
      token_secret: req.user.tumblr_secret
    });
    next();
  };
};
