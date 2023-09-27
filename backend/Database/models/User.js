const { DataTypes } = require('sequelize');
const sequelize = require("../db");


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
    },
});

User.associate = (models) => {
    User.hasMany(models.invoices, { foreignKey: 'owneraddress' });
};

module.exports = User;
