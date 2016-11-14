'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  return sequelize.define('rol', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    descripcion: DataTypes.STRING
  }, {
    underscored: true,
    underscoredAll: true,
    createdAt: 'fecha_creacion',
    updatedAt: 'fecha_actualizacion',
    freezeTableName: true
  });
};
//# sourceMappingURL=rol.model.js.map
