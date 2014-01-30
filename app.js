var config = require('./src/config');

server = require('./src/server').createServer();
server.listen(config.LISTEN);

console.log('\n>> Startup completed! Listening on', config.LISTEN);
console.log('\n>> Serving', config.EXTERNALHOSTNAME);
