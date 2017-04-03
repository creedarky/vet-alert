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

app.route('/api/pacientes')
  .put((req, res) => {
    cache.setPatient(req.body)
    res.sendStatus(200);
  });

// Start server
function startServer() {
  const pacientes = [
    {
      idPaciente: 1,
      nombre: 'Mascota',
      especie: {
        nombre: 'Perro',
        minPpm: 80,
        maxPpm: 120,
        minTemp: 38,
        maxTemp: 40,
      },
      monitor: {
        idMonitor: 1,
        active: true,
      }
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
