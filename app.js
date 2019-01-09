'use strict'

const express = require('express');
const config = require('./config/config');
const env = process.env.NODE_ENV || 'development';

console.log('Running in %s environment', env);

const app = express();
const port = config.server[env].port;

app.listen(port, () => {
  console.log('Server listening on port %s', port);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});