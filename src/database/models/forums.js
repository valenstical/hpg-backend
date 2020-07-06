export default (sequelize, DataTypes) => {
  const Forum = sequelize.define('Forum', {
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

  Forum.associate = (models) => {
    Forum.belongsTo(models.User, {
      foreignKey: 'authorCode',
      targetKey: 'code',
      onDelete: 'CASCADE',
    });
  };

  return Forum;
};
