const http = require('http');

const routes = require('./routes')

console.log(routes.hardText)

const server = http.createServer(routes.handler);

server.listen(3030)