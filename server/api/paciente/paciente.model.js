'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('paciente', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: DataTypes.STRING,
    annoNacimiento: DataTypes.INTEGER,
    carnet: DataTypes.INTEGER,
    sexo: DataTypes.CHAR,
    activo: DataTypes.BOOLEAN
  }, {
    underscored: true,
    underscoredAll: true,
    createdAt: 'fecha_creacion',
    updatedAt: 'fecha_actualizacion',
    freezeTableName: true,
  });
}
