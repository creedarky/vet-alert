'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('especie', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: DataTypes.STRING,
    sexo: DataTypes.CHAR,
    minPpm: DataTypes.INTEGER,
    maxPpm: DataTypes.INTEGER,
    minTemp: DataTypes.FLOAT,
    maxTemp: DataTypes.FLOAT
  }, {
    underscored: true,
    underscoredAll: true,
    createdAt: 'fecha_creacion',
    updatedAt: 'fecha_actualizacion',
    freezeTableName: true,
  });
}
