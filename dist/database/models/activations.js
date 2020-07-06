"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(sequelize, DataTypes) {
  var Activation = sequelize.define('Activation', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userCode: {
      type: DataTypes.INTEGER
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW,
      onUpdate: sequelize.NOW
    }
  });

  Activation.associate = function (models) {
    Activation.belongsTo(models.User, {
      foreignKey: 'userCode',
      targetKey: 'code',
      onDelete: 'CASCADE'
    });
  };

  return Activation;
};

exports["default"] = _default;