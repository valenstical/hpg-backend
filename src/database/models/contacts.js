import { convertTimeLapsed } from '../../helpers/utils';

export default (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    notes: {
      type: DataTypes.STRING,
    },
    tags: {
      type: DataTypes.STRING,
    },
    user_code: {
      type: DataTypes.INTEGER,
    },
    fbo_id: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
    },
    source: {
      type: DataTypes.STRING,
    },
    ip_address: {
      type: DataTypes.STRING,
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
  return Contact;
};
