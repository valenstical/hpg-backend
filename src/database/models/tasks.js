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
    userCode: {
      type: DataTypes.INTEGER,
    },
    dueTime: {
      type: DataTypes.STRING,
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

  Task.associate = (models) => {
    Task.belongsTo(models.User, {
      foreignKey: 'userCode',
      targetKey: 'code',
      onDelete: 'CASCADE',
    });
  };

  return Task;
};
