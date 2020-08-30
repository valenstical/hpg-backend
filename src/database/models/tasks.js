export default (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING,
    },
    details: {
      type: DataTypes.INTEGER,
    },
    user_code: {
      type: DataTypes.INTEGER,
    },
    due_time: {
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

  Task.associate = (models) => {
    Task.belongsTo(models.User, {
      foreignKey: 'user_code',
      targetKey: 'user_code',
      onDelete: 'CASCADE',
      as: 'user'
    });
  };

  return Task;
};
