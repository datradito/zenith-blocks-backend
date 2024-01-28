import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import { BillStatuses } from "../../utility/BillStatuses.js";

const Payment = sequelize.define("payments", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
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
    defaultValue: BillStatuses.PENDING,
    allowNull: false,
  },
  invoiceid: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  transactionhash: {
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


export default Payment;
