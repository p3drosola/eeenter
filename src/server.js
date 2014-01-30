module.exports.createServer = function () {
  'use strict';

  var server, express, path, config, RedisStore;

  express = require('express');
  path = require('path');
  config = require('./config');
  RedisStore = require('connect-redis')(express);

  // configure server
  server = express();

  server.use(express.static(path.resolve(__dirname, '../assets')));
  server.use(express.logger());

  server.use(express.cookieParser());
  server.use(express.bodyParser());

  server.use(express.session({
    secret: config.SESSION_SECRET,
    cookie : {
      maxAge : 604800 // one week
    },
    store: new RedisStore({
      host: config.DB_HOST,
      port: config.DB_PORT
    })
  }));

  server.engine('jade', require('jade').__express);
  server.set('view engine', 'jade');
  server.set('views', __dirname + '/views');

  require('./startup.js')(server);

  return server;
};
