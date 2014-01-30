var passport = require('passport')
  , _ = require('underscore')
  , async = require('async')
  , config = require('../config')
  , ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn
  , TumblrStrategy = require('passport-tumblr').Strategy;

module.exports = function (server) {

  function saveUser (user) {
    var redis = server.get('db');
    redis.set('user:' + user.username + ':tumblr_token', user.tumblr_token);
    redis.set('user:' + user.username + ':tumblr_secret', user.tumblr_secret);
    console.log('saved user', user);
  }

  passport.use(new TumblrStrategy({
      consumerKey: config.CONSUMER_KEY,
      consumerSecret: config.CONSUMER_SECRET,
      callbackURL: config.EXTERNALHOSTNAME + '/auth/callback'
    },
    function (token, token_secret, profile, done) {
      var user = {
        username: profile.username
      , tumblr_token: token
      , tumblr_secret: token_secret
      };
      saveUser(user);
      done(null, user);
    }
  ));

  passport.serializeUser(function (user, done) {
    done(null, user.username);
  });

  passport.deserializeUser(function (username, done) {
    var keys = ['tumblr_token', 'tumblr_secret'];
    async.map(keys, function (key, callback) {
      server.get('db').get('user:' + username + ':' + key, callback);
    }, function (err, results) {
      var user = {username: username};
      _.extend(user, _.object(keys, results));
      done(null, user);
    });
  });

  server.use(passport.initialize());
  server.use(passport.session());

  server.get('/auth/tumblr', passport.authenticate('tumblr'));
  server.get('/auth/tumblr/callback', passport.authenticate('tumblr', {
    successRedirect: '/dashboard',
    failureRedirect: '/auth/fail'
  }));
};
