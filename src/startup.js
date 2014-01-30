module.exports = function (server) {

  var _, _s, fs, path, config,
  controller = {}, middleware = {};

  _ = require('underscore');
  _s = require('underscore.string');
  fs = require('fs');
  path = require('path');
  config = require('./config');

  console.log('Config:');
  console.log(config);

  function load(type, filename) {
  	var name = _s.camelize(filename.replace(/\.js$/, ''));
  	console.log('Loading (' + type + ') ' + name);
  	return [name, require(path.resolve(__dirname, type, filename))(server)];
  }

  _.each(['initializers', 'middlewares', 'controllers'], function (type) {
  	server.set(type, _.object(_.map(fs.readdirSync(path.resolve(__dirname, type)), _.partial(load, type))));
  });

  // map routes to controllers
  console.log('\n>> Routes');
  _.each(require('./routes.js'), function (row) {

    var method = row[0] ,
    url = row[1],
    controller_name = row[2].split('.')[0],
    action_name = row[2].split('.')[1],
    actions = server.get('controllers')[controller_name][action_name];

    if (!_.isArray(actions)) {
      actions = [actions];
    }
    console.log(method, ':', url, '->', actions);

    // convert middleware names to functions
    actions = _.map(actions, function (action) {
      var fn;
      if (_.isString(action)) {
        fn = server.get('middlewares')[action];
        if (!fn) {
          console.log('Missing middleware: ' + action + '. avaliable: ' + _.keys(server.get('middlewares')).join(','))
          throw new Error('Missing middleware');

        }
        return fn;
      }
      return action;
    })

    server[method](url, actions);
  });
};
