/**
 * Main application file
 */

'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _sqldb = require('./sqldb');

var _sqldb2 = _interopRequireDefault(_sqldb);

var _environment = require('./config/environment');

var _environment2 = _interopRequireDefault(_environment);

var _cache = require('./cache');

var _cache2 = _interopRequireDefault(_cache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Paciente = _sqldb2.default.Paciente;
var Especie = _sqldb2.default.Especie;
var Monitor = _sqldb2.default.Monitor;

// Populate databases with sample data

if (_environment2.default.seedDB) {
  require('./config/seed');
}

// Setup server
var app = (0, _express2.default)();
var server = _http2.default.createServer(app);
var socketio = require('socket.io')(server, {
  serveClient: _environment2.default.env !== 'production',
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
    include: [{
      model: Monitor, as: 'monitor'
    }, {
      model: Especie, as: 'especie'
    }]
  }).then(function (result) {
    var pacientes = JSON.parse((0, _stringify2.default)(result));
    _cache2.default.setCurrentPatients(pacientes);
    require('./config/socketio').default(socketio, _cache2.default);
    require('./config/arduino').default(socketio, _cache2.default);
  });

  app.angularFullstack = server.listen(_environment2.default.port, _environment2.default.ip, function () {
    console.log('Express server listening on %d, in %s mode', _environment2.default.port, app.get('env'));
  });
}

_sqldb2.default.sequelize.sync().then(startServer).catch(function (err) {
  throw err;
  console.log('Server failed to start due to error: %s', err);
});

// Expose app
exports = module.exports = app;
//# sourceMappingURL=app.js.map
