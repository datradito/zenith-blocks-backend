import { Sequelize } from "sequelize";
import mysql2 from "mysql2";
const config = {
  host:
    process.env.NODE_ENV === "production"
      ? process.env.DATABASE_HOST_PROD
      : process.env.DATABASE_HOST_DEV,
  dialect: "mysql",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: true,
    },
  },
};

if (process.env.NODE_ENV === "production") {
  config.dialectModule = mysql2;
}

const sequelize = new Sequelize(
  process.env.NODE_ENV === "production"
    ? process.env.DATABASE_NAME_PROD
    : process.env.DATABASE_NAME_DEV,
  process.env.NODE_ENV === "production"
    ? process.env.DATABASE_USER_PROD
    : process.env.DATABASE_USER_DEV,
  process.env.NODE_ENV === "production"
    ? process.env.DATABASE_PASSWORD_PROD
    : process.env.DATABASE_PWD_DEV,
  config
);

export default sequelize;
