var _ = require('underscore'),
async = require('async');

module.exports = function (servear) {
  return function (req, res, next) {
    var offset = req.params.offset || 0;

    req.tumblr.dashboard({
      offset: offset
    }, function (err, res) {
      req.posts = res.posts;
      next();
    });

  };
};
