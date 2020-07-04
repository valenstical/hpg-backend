export default (sequelize, DataTypes) => {
  const ForumReply = sequelize.define('ForumReply', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    message: {
      type: DataTypes.STRING,
    },
    authorCode: {
      type: DataTypes.INTEGER,
    },
    forumId: {
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

  ForumReply.associate = (models) => {
    ForumReply.belongsTo(models.Forum, {
      foreignKey: 'forumId',
      targetKey: 'id',
      onDelete: 'CASCADE',
    });
    ForumReply.belongsTo(models.User, {
      foreignKey: 'authorCode',
      targetKey: 'code',
      onDelete: 'CASCADE',
    });
  };

  return ForumReply;
};
