'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  return sequelize.define('monitoreo_paciente', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    promedioTemperatura: DataTypes.FLOAT,
    promedioPpm: DataTypes.FLOAT,
    promedioMovHora: DataTypes.FLOAT,
    estadoTemperatura: DataTypes.FLOAT,
    estadoMovimiento: DataTypes.STRING,
    estadoPaciente: DataTypes.STRING,
    estadoPpm: DataTypes.INTEGER
  }, {
    underscored: true,
    underscoredAll: true,
    createdAt: 'fecha_creacion',
    updatedAt: 'fecha_actualizacion',
    freezeTableName: true
  });
};
//# sourceMappingURL=monitoreo-paciente.model.js.map
