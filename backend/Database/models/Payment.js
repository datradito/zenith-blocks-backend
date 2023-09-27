const { DataTypes } = require("sequelize");
const sequelize  = require("../db");

const Payment = sequelize.define("payments", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  recipient: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  owneraddress: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  currency: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "Pending",
    allowNull: false,
  },
  uploadPayments: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  proposalid: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  invoiceid: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  transactionHash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  budgetid: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ipfs: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Payment.associate = (models) => {
  Payment.belongsTo(models.invoices, { foreignKey: "invoiceid" });
};


module.exports = Payment;
