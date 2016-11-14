'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  return sequelize.define('monitor', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    activo: DataTypes.BOOLEAN
  }, {
    underscored: true,
    underscoredAll: true,
    createdAt: 'fecha_creacion',
    updatedAt: 'fecha_actualizacion',
    freezeTableName: true
  });
};
//# sourceMappingURL=monitor.model.js.map
