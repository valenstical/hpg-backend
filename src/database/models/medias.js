import getYouTubeID from 'get-youtube-id';
import { MEDIA_TYPES } from '../../helpers/constants';

export default (sequelize, DataTypes) => {
  const Media = sequelize.define('Media', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING,
    },
    file_url: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
    },
    image_url: {
      type: DataTypes.STRING,
      get() {
        const type = this.get('type');
        const fileUrl = this.get('file_url');
        let result = '';
        if (type === MEDIA_TYPES.VIDEO) {
          result = `https://img.youtube.com/vi/${getYouTubeID(fileUrl)}/0.jpg`;
        } if (type === MEDIA_TYPES.IMAGE) {
          result = this.get('file_url');
        }
        return result;
      }
    },
    video_code: {
      type: DataTypes.STRING,
      get() {
        const type = this.getDataValue('type');
        let result = '';
        if (type === MEDIA_TYPES.VIDEO) {
          const fileUrl = this.get('file_url');
          result = getYouTubeID(fileUrl);
        }
        return result;
      }
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
  return Media;
};
