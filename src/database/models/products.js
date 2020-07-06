export default (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    code: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
    },
    short_title: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    carton_units: {
      type: DataTypes.INTEGER,
    },
    category_id: {
      type: DataTypes.INTEGER,
    },
    short_description: {
      type: DataTypes.STRING,
    },
    color: {
      type: DataTypes.STRING,
    },
    long_description: {
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

  Product.associate = (models) => {
    Product.belongsTo(models.Category, {
      foreignKey: 'category_id',
      targetKey: 'id',
      onDelete: 'CASCADE',
      as: 'category'
    });
    Product.hasMany(models.Prescription, {
      foreignKey: 'product_code',
    });
    Product.hasMany(models.Price, {
      foreignKey: 'product_code',
      as: 'price'
    });
  };
  return Product;
};
