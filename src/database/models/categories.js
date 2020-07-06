export default (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING,
    },
    display_title: {
      type: DataTypes.STRING,
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
  }, { underscored: true });

  return Category;
};
