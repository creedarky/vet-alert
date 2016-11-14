'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  return sequelize.define('comuna', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: DataTypes.STRING
  }, {
    underscored: true,
    underscoredAll: true,
    createdAt: 'fecha_creacion',
    updatedAt: 'fecha_actualizacion',
    freezeTableName: true
  });
};
//# sourceMappingURL=comuna.model.js.map
