import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import Budget from "./Budget.js";
import { BillStatuses } from "../../utility/BillStatuses.js";

const Invoice = sequelize.define("invoices", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true,
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
    defaultValue: BillStatuses.UNPAID,
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
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  budgetid: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ipfs: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});


export default Invoice;
