const { Sequelize } = require('sequelize');
require('dotenv').config();


const sequelize = new Sequelize(process.env.DATABASE_NAME_DEV, process.env.DATABASE_USER_DEV, process.env.DATABASE_PWD_DEV, {
    host: process.env.DATABASE_HOST_DEV,
    dialect: 'mysql',
    dialectModule: require('mysql2'),
    dialectOptions: {
        ssl: {
            rejectUnauthorized: true,
        }
    }
});

const init = async () => {
    // console.log(sequelize.beforeSync())
        await sequelize.sync()
            .then(() => console.log('Connection has been established successfully.'))
            .catch(error => console.error('Unable to connect to the database:', error));
}


module.exports = { sequelize , init};