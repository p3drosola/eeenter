module.exports = function (server) {
  server.use(require('connect-flash')());
  server.use(function (req, res, next) {
    res.locals.flash_messages = req.flash();
    next();
  });
};
