var _ = require('underscore'),
_s = require('underscore.string');

module.exports = function (server) {
  var controller = {};

  /*
   * Loads & displays the specified stream
   */
  controller.show = ['session', 'ensureLogin', function (req, res) {
    res.render('dashboard/show', {
      title: 'Dashboard',
      user: req.user,
      body_class: 'dashboard'
    });
  }];

  controller.posts = ['session', 'ensureLogin', 'tumblr', 'loadDashboard', function (req, res) {
    res.json(req.posts);
  }];

  return controller;
};
