import { convertTimeLapsed } from '../../helpers/utils';

export default (sequelize, DataTypes) => {
  const Forum = sequelize.define('Forum', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING,
    },
    user_code: {
      type: DataTypes.INTEGER,
    },
    replies_count: {
      type: DataTypes.INTEGER,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW,
      get() {
        return convertTimeLapsed(this.getDataValue('created_at'));
      }
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW,
      onUpdate: sequelize.NOW,
    },
  });

  Forum.associate = (models) => {
    Forum.belongsTo(models.User, {
      foreignKey: 'user_code',
      targetKey: 'user_code',
      onDelete: 'CASCADE',
      as: 'user'
    });
    Forum.hasMany(models.ForumReply, {
      foreignKey: 'forum_id',
      as: 'replies'
    });
  };

  return Forum;
};
