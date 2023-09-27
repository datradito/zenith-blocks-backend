const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DATABASE_NAME_DEV,
  process.env.DATABASE_USER_DEV,
  process.env.DATABASE_PWD_DEV,
  {
    host: process.env.DATABASE_HOST_DEV,
    dialect: "mysql",
    dialectOptions: {
      ssl: {
        rejectUnauthorized: true,
      },
      },
  }
);

module.exports = sequelize;
