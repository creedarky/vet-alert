/**
 * Sequelize initialization module
 */

'use strict';

var _environment = require('../config/environment');

var _environment2 = _interopRequireDefault(_environment);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var db = {
  Sequelize: _sequelize2.default,
  // sequelize: new Sequelize(config.sequelize.uri, config.sequelize.options)
  sequelize: new _sequelize2.default(_environment2.default.sequelize.database, _environment2.default.sequelize.username, _environment2.default.sequelize.password, {
    host: _environment2.default.sequelize.host,
    port: _environment2.default.sequelize.port
  })
};

// Insert models below
db.Monitor = db.sequelize.import('../api/monitor/monitor.model');
db.Ciudad = db.sequelize.import('../api/ciudad/ciudad.model');
db.Rol = db.sequelize.import('../api/rol/rol.model');
db.Permiso = db.sequelize.import('../api/permiso/permiso.model');
db.RolPermiso = db.sequelize.import('../api/rol-permiso/rol-permiso.model');
db.Paciente = db.sequelize.import('../api/paciente/paciente.model');
db.MonitoreoPaciente = db.sequelize.import('../api/monitoreo-paciente/monitoreo-paciente.model');
db.Log = db.sequelize.import('../api/log/log.model');
db.Evento = db.sequelize.import('../api/evento/evento.model');
db.Especie = db.sequelize.import('../api/especie/especie.model');
db.Comuna = db.sequelize.import('../api/comuna/comuna.model');
db.Apoderado = db.sequelize.import('../api/apoderado/apoderado.model');
db.User = db.sequelize.import('../api/user/user.model');

db.Apoderado.belongsTo(db.Comuna, { foreignKey: 'id_comuna' });
db.Comuna.belongsTo(db.Ciudad, { foreignKey: 'id_ciudad' });
db.Paciente.belongsTo(db.Apoderado, { foreignKey: 'id_apoderado' });
db.Paciente.belongsTo(db.Especie, { foreignKey: 'id_especie' });
db.Paciente.belongsTo(db.Monitor, { foreignKey: 'id_monitor' });
db.Log.belongsTo(db.Evento, { foreignKey: 'id_evento' });
db.Log.belongsTo(db.User, { foreignKey: 'id_usuario' });
db.Log.belongsTo(db.Paciente, { foreignKey: 'id_paciente' });
db.User.belongsTo(db.Rol, { foreignKey: 'id_rol' });
db.MonitoreoPaciente.belongsTo(db.Paciente, { foreignKey: 'id_paciente' });

db.Rol.belongsToMany(db.Permiso, {
  through: {
    model: db.RolPermiso,
    unique: false
  },
  foreignKey: 'id_rol',
  constraints: false
});
db.Permiso.belongsToMany(db.Rol, {
  through: {
    model: db.RolPermiso,
    unique: false
  },
  foreignKey: 'id_permiso',
  constraints: false
});

db.insertLog = function (req) {
  db.sequelize.query('CALL sp_identifica_trx(' + req.user.id + ')');
};

module.exports = db;
//# sourceMappingURL=index.js.map
