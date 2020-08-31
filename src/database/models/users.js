import { generateToken } from '../../helpers/utils';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    user_code: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    fbo_id: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    level: {
      type: DataTypes.STRING,
    },
    firebase_token: {
      type: DataTypes.STRING,
    },
    sponsor_id: {
      type: DataTypes.STRING,
    },
    first_name: {
      type: DataTypes.STRING,
      set(value) {
        this.setDataValue(
          'first_name',
          value.toLowerCase()
        );
      },
    },
    last_name: {
      type: DataTypes.STRING,
      set(value) {
        this.setDataValue(
          'last_name',
          value.toLowerCase()
        );
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
      unique: true,
    },
    image_url: {
      type: DataTypes.STRING,
    },
    state_code: {
      type: DataTypes.STRING,
    },
    country_code: {
      type: DataTypes.STRING,
    },
    auth_token: {
      type: DataTypes.STRING,
      set(value) {
        this.setDataValue(
          'auth_token',
          generateToken({ user_code: value }, '200y')
        );
      },
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    ban_message: {
      type: DataTypes.STRING,
    },
    is_editor: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    app_activated: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_blocked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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

  /**
   * Get a User if exist
   * @param {string} column Column to check against
   * @param {string} value Value to lookup
   * @returns {object} The user details if found, null
   */
  User.getUser = async (column, value) => {
    let result = null;
    try {
      const { dataValues } = await User.findOne({
        where: {
          [column]: value,
        },
      });
      result = dataValues;
    } catch (error) {
      console.error(error);
    }
    return result;
  };

  return User;
};
