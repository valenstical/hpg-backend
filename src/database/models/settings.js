export default (sequelize, DataTypes) => {
  const Setting = sequelize.define('Setting', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    active_cc: {
      type: DataTypes.FLOAT,
    },
    cc_due_date: {
      type: DataTypes.INTEGER,
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

  return Setting;
};
