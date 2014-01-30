var _ = require('underscore'),
_s = require('underscore.string');

module.exports = function (server) {
  var controller = {};

  /*
   * Loads & displays the specified stream
   */
  controller.show = ['ensureLogin', 'tumblr', 'loadDashboard', function (req, res) {

    console.log('posts', req.posts.length);

    res.render('dashboard/show', {
      title: 'Dashboard',
      user: req.user,
      posts: req.posts,
      body_class: 'stream stream_show'
    });
  }];

  return controller;
};
