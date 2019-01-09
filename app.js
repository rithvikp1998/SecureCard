const http = require('http');
const config = require('./config/config');
const env = process.env.NODE_ENV || 'development';

const hostname = config.server[env].hostname;
const port = config.server[env].port;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
