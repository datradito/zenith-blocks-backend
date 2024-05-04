import { DataTypes } from "sequelize";
import sequelize from "../db.js";

import { Sequelize, Model } from "sequelize";

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    daoid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    notificatonSettings: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: {
        discord: true,
        telegram: true,
      },
    },
    discordid: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    telegramid: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: sequelize,
    tableName: "users",
    indexes: [
      {
        name: "user_discordid",
        fields: ["discordid"],
      },
      {
        name: "user_telegramid",
        fields: ["telegramid"],
      },
      {
        name: "user_address",
        fields: ["address"],
      },
    ],
  }
);

export default User;
