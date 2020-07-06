export default (sequelize, DataTypes) => {
  const Price = sequelize.define('Price', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    productCode: {
      type: DataTypes.STRING,
    },
    currency: {
      type: DataTypes.STRING,
    },
    countryId: {
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

  Price.associate = (models) => {
    Price.belongsTo(models.Product, {
      foreignKey: 'productCode',
      targetKey: 'code',
      onDelete: 'CASCADE',
    });
  };

  return Price;
};
