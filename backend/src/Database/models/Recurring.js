import { DataTypes, Model } from "sequelize";
import sequelize from "../db.js";
import Invoice from "./Invoice.js"; // Import the Invoice model

class Recurring extends Model {}

Recurring.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    billId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Invoice, // reference to the Invoice model
        key: "id", // field in the Invoice model that is being referred to
      },
    },
    frequency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: sequelize,
    tableName: "recurring",
  }
);

Invoice.hasOne(Recurring, { foreignKey: "id", as: "recurring" }); // Add this line
Recurring.belongsTo(Invoice, { foreignKey: "billId", as: "invoice" }); // Add this line
