export default (sequelize, DataTypes) => {
  const Activation = sequelize.define('Activation', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userCode: {
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
  Activation.associate = (models) => {
    Activation.belongsTo(models.User, {
      foreignKey: 'userCode',
      targetKey: 'code',
      onDelete: 'CASCADE',
    });
  };
  return Activation;
};
