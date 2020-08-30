import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

TimeAgo.addLocale(en);

export default (sequelize, DataTypes) => {
  const ForumReply = sequelize.define('ForumReply', {
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
    forum_id: {
      type: DataTypes.INTEGER,
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
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

  ForumReply.associate = (models) => {
    ForumReply.belongsTo(models.Forum, {
      foreignKey: 'forum_id',
      targetKey: 'id',
      onDelete: 'CASCADE',
      as: 'forum'
    });
    ForumReply.belongsTo(models.User, {
      foreignKey: 'user_code',
      targetKey: 'user_code',
      onDelete: 'CASCADE',
    });
  };

  return ForumReply;
};
