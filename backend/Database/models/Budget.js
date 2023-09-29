const { DataTypes } = require('sequelize');
const sequelize = require("../db");
const Proposal = require('./Proposal');
const Invoice = require('./Invoice');

const Budget = sequelize.define("budgets", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  currency: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  breakdown: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  proposalid: {
    type: DataTypes.STRING.BINARY,
    allowNull: false,
  },
  ipfs: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  remaining: {
    type: DataTypes.VIRTUAL,
    get() {
      // Calculate the remaining amount based on associated invoices
      if (this.invoices && this.invoices.length > 0) {
        const totalInvoiceAmount = this.invoices.reduce(
          (acc, invoice) => acc + invoice.total,
          0
        );
        return this.getDataValue("amount") - totalInvoiceAmount;
      }
      return this.getDataValue("amount"); // If no invoices, remaining is the full amount
    },
  },
});



module.exports = Budget;
