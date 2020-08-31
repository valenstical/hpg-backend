import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import { convertTimeLapsed } from '../../helpers/utils';

TimeAgo.addLocale(en);

export default (sequelize, DataTypes) => {
  const Training = sequelize.define('Training', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    image_url: {
      type: DataTypes.STRING,
      get() {
        const videoCode = this.getDataValue('video_code');
        const imageUrl = this.getDataValue('image_url');
        return imageUrl || `https://img.youtube.com/vi/${videoCode}/0.jpg`;
      }
    },
    description: {
      type: DataTypes.STRING,
      get() {
        const value = this.getDataValue('description').substr(0, 100);
        return value.length >= 100 ? `${value}...` : value;
      }
    },
    body: {
      type: DataTypes.STRING,
    },
    video_code: {
      type: DataTypes.STRING,
    },
    user_code: {
      type: DataTypes.INTEGER,
    },
    category: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
    },
    views: {
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

  Training.associate = (models) => {
    Training.belongsTo(models.User, {
      foreignKey: 'user_code',
      targetKey: 'user_code',
      onDelete: 'CASCADE',
      as: 'user'
    });
  };

  return Training;
};
