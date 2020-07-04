export default (sequelize, DataTypes) => {
  const Prescription = sequelize.define('Prescription', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    productCode: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    usage: {
      type: DataTypes.STRING,
    },
    ailmentId: {
      type: DataTypes.INTEGER,
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
  Prescription.associate = (models) => {
    Prescription.belongsTo(models.Ailment, {
      foreignKey: 'ailmentId',
      targetKey: 'id',
      onDelete: 'CASCADE',
    });
    Prescription.belongsTo(models.Product, {
      foreignKey: 'productCode',
      targetKey: 'code',
      onDelete: 'CASCADE',
    });
  };
  return Prescription;
};
