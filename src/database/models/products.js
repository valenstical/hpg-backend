export default (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    code: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
    },
    cc: {
      type: DataTypes.FLOAT,
    },
    name: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    cartonUnits: {
      type: DataTypes.INTEGER,
    },
    categoryId: {
      type: DataTypes.INTEGER,
    },
    shortDescription: {
      type: DataTypes.STRING,
    },
    color: {
      type: DataTypes.STRING,
    },
    longDescription: {
      type: DataTypes.STRING,
    },
    highlights: {
      type: DataTypes.STRING,
    },
    usage: {
      type: DataTypes.STRING,
    },
    ingredients: {
      type: DataTypes.STRING,
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

  Product.associate = (models) => {
    Product.belongsTo(models.ProductCategory, {
      foreignKey: 'categoryId',
      targetKey: 'id',
      onDelete: 'CASCADE',
    });
  };
  return Product;
};
