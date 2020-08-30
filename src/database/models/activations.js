export default (sequelize, DataTypes) => {
  const Activation = sequelize.define('Activation', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    user_code: {
      type: DataTypes.INTEGER,
    },
    fbo_id: {
      type: DataTypes.STRING,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW,
      onUpdate: sequelize.NOW,
    },
  });
  Activation.associate = (models) => {
    Activation.belongsTo(models.User, {
      foreignKey: 'user_code',
      targetKey: 'user_code',
      onDelete: 'CASCADE',
      as: 'user'
    });
  };
  return Activation;
};
