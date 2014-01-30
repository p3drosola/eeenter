var config = require('./src/config');

server = require('./src/server').createServer();
server.listen(config.PORT);

console.log('\n>> Startup completed! Running on', config.hostname());
