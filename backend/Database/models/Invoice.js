import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import Budget from "./Budget.js";

const Invoice = sequelize.define("invoices", {
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
  recipient: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  owneraddress: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  number: {
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
    defaultValue: "New",
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  duedate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  uploadinvoice: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
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

export default Invoice;
