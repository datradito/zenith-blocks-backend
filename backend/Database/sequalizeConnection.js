const { Sequelize } = require('sequelize');
require('dotenv').config();


const sequelize = new Sequelize(
  process.env.PLANETSCALE_DB,
  process.env.PLANETSCALE_DB_USERNAME,
  process.env.PLANETSCALE_DB_PASSWORD,
  {
    host: process.env.PLANETSCALE_DB_HOST,
    dialect: "mysql",
    dialectModule: require("mysql2"),
    dialectOptions: {
      ssl: {
        rejectUnauthorized: true,
      },
    },
  }
);

const init = async () => {
    // console.log(sequelize.beforeSync())
        await sequelize.sync()
            .then(() => console.log('Connection has been established successfully.'))
            .catch(error => console.error('Unable to connect to the database:', error));
}


module.exports = { sequelize , init};