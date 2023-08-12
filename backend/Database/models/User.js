const { DataTypes } = require('sequelize');
const { sequelize } = require('../sequalizeConnection');

//create user model here with daoId, address. id is the primary key
const User = sequelize.define('users', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    daoId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = User;

// User.associate = (models) => {
//     User.hasMany(models.proposals, { foreignKey: 'userid' });
//     User.hasMany(models.budgets, { foreignKey: 'userid' });
//     User.hasMany(models.invoices, { foreignKey: 'userid' });
// }