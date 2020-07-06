"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(sequelize, DataTypes) {
  var Ailment = sequelize.define('Ailment', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: {
      type: DataTypes.STRING,
      uniqueKey: true
    },
    description: {
      type: DataTypes.STRING
    },
    instructions: {
      type: DataTypes.STRING
    },
    external_url: {
      type: DataTypes.STRING
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW,
      onUpdate: sequelize.NOW
    }
  });

  Ailment.associate = function (models) {
    Ailment.hasMany(models.Prescription, {
      foreignKey: 'ailment_id',
      as: 'prescriptions'
    });
  };

  return Ailment;
};

exports["default"] = _default;