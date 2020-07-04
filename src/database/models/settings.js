export default (sequelize, DataTypes) => {
  const Setting = sequelize.define('Setting', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    activeCC: {
      type: DataTypes.FLOAT,
    },
    ccDueDate: {
      type: DataTypes.INTEGER,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW,
      onUpdate: sequelize.NOW,
    },
  });

  return Setting;
};
