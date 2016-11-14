/**
 * Main application routes
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (app) {
  // Insert routes below
  app.use('/api/monitores', require('./api/monitor'));
  app.use('/api/ciudades', require('./api/ciudad'));
  app.use('/api/roles', require('./api/rol'));
  app.use('/api/rols', require('./api/rol'));
  app.use('/api/permisos', require('./api/permiso'));
  app.use('/api/pacientes', require('./api/paciente'));
  app.use('/api/monitoreo-pacientes', require('./api/monitoreo-paciente'));
  app.use('/api/logs', require('./api/log'));
  app.use('/api/eventos', require('./api/evento'));
  app.use('/api/especies', require('./api/especie'));
  app.use('/api/comunas', require('./api/comuna'));
  app.use('/api/apoderados', require('./api/apoderado'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth').default);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*').get(_errors2.default[404]);

  // All other routes should redirect to the index.html
  app.route('/*').get(function (req, res) {
    res.sendFile(_path2.default.resolve(app.get('appPath') + '/index.html'));
  });
};

var _errors = require('./components/errors');

var _errors2 = _interopRequireDefault(_errors);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=routes.js.map
