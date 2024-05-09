import { DataTypes } from "sequelize";
import sequelize from "../db.js";

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
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  remaining: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
});

export default Budget;
