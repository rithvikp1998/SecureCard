'use strict'

const express = require('express');
const io = require('socket.io');
const parser = require('body-parser');
const session = require('express-session');
const config = require('./config/config');
const env = process.env.NODE_ENV || 'development';
const routes = require('./app/routes/routes');

console.log('Running in %s environment', env);

const app = express();

app.use(session({ // TODO Change these values after testing
  secret: 'keyboard cat',
  rolling: true,
  resave: true,
  saveUninitialized: false,
  authenticated: false,
  cookie: {
    maxAge: 600000000 // Change this as needed
  }
}));
app.use(parser.json());
app.use(routes);
app.use('/', express.static('app/web'));
app.use('/server', express.static('app/server'));

const port = config.server[env].port;

const http_server = app.listen(port, () => {
  console.log('HTTP server created on port %s', port);
});

const io_server = io(http_server);

require('./app/server/server')(io_server);
