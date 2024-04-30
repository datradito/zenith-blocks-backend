import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Category = sequelize.define("categories", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  label: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  daoid: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Category;
