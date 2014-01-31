var _ = require('underscore'),
async = require('async');

module.exports = function (servear) {
  return function (req, res, next) {
    var params = {offset: req.query.offset || 0};
    if (req.query.type) {
      params.type = req.query.type;
    }
    req.tumblr.dashboard(params, function (err, data) {
      if (!err) {
        req.posts = data.posts;
        next();
      } else {
        console.log(err);
        res.end('error loading posts');
      }
    });

  };
};
