/**
 * Main application file
 */

'use strict';

import express from 'express';
import http from 'http';
import sqldb from './sqldb';
import config from './config/environment';
import cache from './cache'

const { Paciente, Especie, Monitor } = sqldb;

// Populate databases with sample data
if (config.seedDB) {
  require('./config/seed');
}

// Setup server
const app = express();
const server = http.createServer(app);
const socketio = require('socket.io')(server, {
  serveClient: config.env !== 'production',
  path: '/socket.io-client'
});

require('./config/express').default(app);
require('./routes').default(app);

// Start server
function startServer() {
  Paciente.findAll({
    where: {
      activo: true,
      id_monitor: {
        $ne: null
      }
    },
    include: [
      {
        model: Monitor, as: 'monitor'
      },
      {
        model: Especie, as: 'especie'
      }
    ]
  }).then(result => {
    const pacientes = JSON.parse(JSON.stringify(result));
    cache.setCurrentPatients(pacientes);
    require('./config/socketio').default(socketio, cache);
    require('./config/arduino').default(socketio, cache);
  });

  app.angularFullstack = server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

sqldb.sequelize.sync()
  .then(startServer)
  .catch(function(err) {
    throw err;
    console.log('Server failed to start due to error: %s', err);
  });

// Expose app
exports = module.exports = app;
