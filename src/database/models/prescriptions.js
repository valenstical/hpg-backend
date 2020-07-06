export default (sequelize, DataTypes) => {
  const Prescription = sequelize.define('Prescription', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    product_code: {
      type: DataTypes.STRING,
    },
    dosage: {
      type: DataTypes.STRING,
    },
    ailment_id: {
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
  }, { underscored: true });

  Prescription.associate = (models) => {
    Prescription.belongsTo(models.Ailment, {
      foreignKey: 'ailment_id',
      targetKey: 'id',
      onDelete: 'CASCADE',
    });
    Prescription.belongsTo(models.Product, {
      foreignKey: 'product_code',
      targetKey: 'code',
      onDelete: 'CASCADE',
      as: 'product'
    });
  };
  return Prescription;
};
