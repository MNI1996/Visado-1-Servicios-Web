const http = require('http');
const app = require('./app');

const PORT = 5001;

const server = http.createServer(app);

server.listen(PORT);