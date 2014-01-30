module.exports = function (server) {
  return require('connect-ensure-login').ensureLoggedIn('/auth');
};