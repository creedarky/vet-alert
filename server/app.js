/**
 * Main application file
 */

'use strict';

import express from 'express';
import http from 'http';
// import sqldb from './sqldb';
import config from './config/environment';
import cache from './cache'


// Inyectar datos de prueba
// if (config.seedDB) {
//   require('./config/seed');
// }

// Setup server
const app = express(); //framework para apis
const server = http.createServer(app);
const socketio = require('socket.io')(server, {
  serveClient: config.env !== 'production',
  path: '/socket.io-client'
});

require('./config/express').default(app);
require('./routes').default(app);

// Start server
function startServer() {
  const pacientes = [
    {
      id_monitor: 1,
      active: true,
    }
  ];
  cache.setCurrentPatients(pacientes);
  require('./config/socketio').default(socketio, cache);
  require('./config/arduino').default(socketio, cache);

  app.angularFullstack = server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

startServer();
// Expose app
exports = module.exports = app;
