import bcrypt from 'bcryptjs';
import { throws } from 'assert';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    code: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    fboId: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    level: {
      type: DataTypes.STRING,
    },
    firebaseToken: {
      type: DataTypes.STRING,
    },
    sponsorId: {
      type: DataTypes.STRING,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
      unique: true,
    },
    image: {
      type: DataTypes.STRING,
    },
    stateId: {
      type: DataTypes.STRING,
    },
    countryId: {
      type: DataTypes.STRING,
    },
    authToken: {
      type: DataTypes.STRING,
      set(value) {
        this.setDataValue(
          'password',
          bcrypt.hashSync(value, process.env.SECRET_KEY),
        );
      },
    },
    appActivated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isBlocked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
        attributes: {
          exclude: ['password'],
        },
      });
      result = dataValues;
    } catch (error) {
      throws(error);
    }
    return result;
  };

  return User;
};
