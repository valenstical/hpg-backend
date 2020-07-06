"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(sequelize, DataTypes) {
  var TrainingReply = sequelize.define('TrainingReply', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    message: {
      type: DataTypes.STRING
    },
    authorCode: {
      type: DataTypes.INTEGER
    },
    trainingId: {
      type: DataTypes.INTEGER
    },
    isDeleted: {
      type: DataTypes.BOOLEAN
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

  TrainingReply.associate = function (models) {
    TrainingReply.belongsTo(models.Training, {
      foreignKey: 'trainingId',
      targetKey: 'id',
      onDelete: 'CASCADE'
    });
    TrainingReply.belongsTo(models.User, {
      foreignKey: 'authorCode',
      targetKey: 'code',
      onDelete: 'CASCADE'
    });
  };

  return TrainingReply;
};

exports["default"] = _default;