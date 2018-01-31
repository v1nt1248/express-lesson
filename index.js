const bd = require('./bd');
bd.connect();

const server = require('./server');
server.start(3000);
