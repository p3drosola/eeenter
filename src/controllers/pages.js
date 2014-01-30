var _ = require('underscore'),
_s = require('underscore.string');

module.exports = function (server) {
  var controller = {};


  controller.home = [function (req, res) {
    res.render('pages/home');
  }];

  return controller;
};
