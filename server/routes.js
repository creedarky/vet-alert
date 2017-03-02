/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function(app) {
  // Insert routes below
  // app.use('/api/monitores', require('./api/monitor'));
  // app.use('/api/ciudades', require('./api/ciudad'));
  // app.use('/api/roles', require('./api/rol'));
  // app.use('/api/rols', require('./api/rol'));
  // app.use('/api/permisos', require('./api/permiso'));
  // app.use('/api/pacientes', require('./api/paciente'));
  // app.use('/api/monitoreo-pacientes', require('./api/monitoreo-paciente'));
  // app.use('/api/logs', require('./api/log'));
  // app.use('/api/eventos', require('./api/evento'));
  // app.use('/api/especies', require('./api/especie'));
  // app.use('/api/comunas', require('./api/comuna'));
  // app.use('/api/apoderados', require('./api/apoderado'));
  // app.use('/api/users', require('./api/user'));
  // app.use('/api/reportes', require('./api/reporte'));

  // app.use('/auth', require('./auth').default);
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
    });
}
