import { DataTypes } from "sequelize";
import sequelize from "../db.js";


import { Sequelize, Model } from "sequelize";


class User extends Model { 

}


User.init({
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
}, {
  sequelize: sequelize,
  tableName: "users",
});

export default User;
