import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

TimeAgo.addLocale(en);

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
        const date = this.getDataValue('created_at');
        return { date, time_elapsed: new TimeAgo().format(new Date(date)) };
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
