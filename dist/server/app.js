/**
 * Main application file
 */

'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _environment = require('./config/environment');

var _environment2 = _interopRequireDefault(_environment);

var _cache = require('./cache');

var _cache2 = _interopRequireDefault(_cache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Inyectar datos de prueba
// if (config.seedDB) {
//   require('./config/seed');
// }

// Setup server

// import sqldb from './sqldb';
var app = (0, _express2.default)(); //framework para apis
var server = _http2.default.createServer(app);
var socketio = require('socket.io')(server, {
  serveClient: _environment2.default.env !== 'production',
  path: '/socket.io-client'
});

require('./config/express').default(app);
require('./routes').default(app);

app.route('/api/pacientes').put(function (req, res) {
  _cache2.default.setPatient(req.body);
  res.sendStatus(200);
});

// Start server
function startServer() {
  var pacientes = [{
    idPaciente: 1,
    nombre: 'Mascota',
    especie: {
      nombre: 'Perro',
      minPpm: 80,
      maxPpm: 120,
      minTemp: 38,
      maxTemp: 40
    },
    monitor: {
      idMonitor: 1,
      active: true
    }
  }];
  _cache2.default.setCurrentPatients(pacientes);
  require('./config/socketio').default(socketio, _cache2.default);
  require('./config/arduino').default(socketio, _cache2.default);

  app.angularFullstack = server.listen(_environment2.default.port, _environment2.default.ip, function () {
    console.log('Express server listening on %d, in %s mode', _environment2.default.port, app.get('env'));
  });
}

startServer();
// Expose app
exports = module.exports = app;
//# sourceMappingURL=app.js.map
