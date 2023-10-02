const { Sequelize } = require("sequelize");

const config = {
  host: process.env.NODE_ENV === 'production' ? process.env.DATABASE_HOST_PROD : process.env.DATABASE_HOST_DEV,
  dialect: 'mysql',
  dialectOptions: {
    ssl: {
      rejectUnauthorized: true,
    },
  },
};

// Set the dialectModule based on the environment
if (process.env.NODE_ENV === 'production') {
  config.dialectModule = require('mysql2');
}


const sequelize = new Sequelize(
  process.env.NODE_ENV === 'production' ? process.env.DATABASE_NAME_PROD : process.env.DATABASE_NAME_DEV,
  process.env.NODE_ENV === 'production' ? process.env.DATABASE_USER_PROD : process.env.DATABASE_USER_DEV,
  process.env.NODE_ENV === 'production' ? process.env.DATABASE_PASSWORD_PROD : process.env.DATABASE_PWD_DEV,
  config
);


module.exports = sequelize;
