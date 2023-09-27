const { DataTypes } = require('sequelize');
const sequelize = require("../db");

const Proposal = sequelize.define('proposals', {
    id: {
        type: DataTypes.STRING.BINARY, // Use DataTypes.INTEGER if using auto-incrementing integer as primary key
        allowNull: false,
        primaryKey: true,
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: "NotFilled",
        allowNull: false,
    },
    modifier: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    daoid: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ipfs: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

Proposal.associate = (models) => {
    Proposal.hasMany(models.budgets, { foreignKey: 'proposalid' });
};

module.exports = Proposal;