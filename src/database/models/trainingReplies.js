export default (sequelize, DataTypes) => {
  const TrainingReply = sequelize.define('TrainingReply', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    message: {
      type: DataTypes.STRING,
    },
    authorCode: {
      type: DataTypes.INTEGER,
    },
    trainingId: {
      type: DataTypes.INTEGER,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
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

  TrainingReply.associate = (models) => {
    TrainingReply.belongsTo(models.Training, {
      foreignKey: 'trainingId',
      targetKey: 'id',
      onDelete: 'CASCADE',
    });
    TrainingReply.belongsTo(models.User, {
      foreignKey: 'authorCode',
      targetKey: 'code',
      onDelete: 'CASCADE',
    });
  };

  return TrainingReply;
};
