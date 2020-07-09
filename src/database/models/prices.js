export default (sequelize, DataTypes) => {
  const Price = sequelize.define('Price', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    product_code: {
      type: DataTypes.STRING,
    },
    country_code: {
      type: DataTypes.STRING,
    },
    cc: {
      type: DataTypes.FLOAT,
    },
    currency_iso: {
      type: DataTypes.STRING,
    },
    currency_symbol: {
      type: DataTypes.STRING,
    },
    wholesale: {
      type: DataTypes.FLOAT,
    },
    novus: {
      type: DataTypes.FLOAT,
    },
    retail: {
      type: DataTypes.FLOAT,
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

  Price.associate = (models) => {
    Price.belongsTo(models.Product, {
      foreignKey: 'product_code',
      targetKey: 'code',
      onDelete: 'CASCADE',
    });
  };

  return Price;
};
