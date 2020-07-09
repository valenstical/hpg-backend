"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(sequelize, DataTypes) {
  var Training = sequelize.define('Training', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    image: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    video: {
      type: DataTypes.STRING
    },
    authorCode: {
      type: DataTypes.INTEGER
    },
    category: {
      type: DataTypes.STRING
    },
    title: {
      type: DataTypes.STRING
    },
    views: {
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

  Training.associate = function (models) {
    Training.belongsTo(models.User, {
      foreignKey: 'authorCode',
      targetKey: 'code',
      onDelete: 'CASCADE'
    });
  };

  return Training;
};

exports["default"] = _default;