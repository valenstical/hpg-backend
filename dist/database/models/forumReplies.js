"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(sequelize, DataTypes) {
  var ForumReply = sequelize.define('ForumReply', {
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
    forumId: {
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

  ForumReply.associate = function (models) {
    ForumReply.belongsTo(models.Forum, {
      foreignKey: 'forumId',
      targetKey: 'id',
      onDelete: 'CASCADE'
    });
    ForumReply.belongsTo(models.User, {
      foreignKey: 'authorCode',
      targetKey: 'code',
      onDelete: 'CASCADE'
    });
  };

  return ForumReply;
};

exports["default"] = _default;