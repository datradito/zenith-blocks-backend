const { DataTypes } = require('sequelize');
const sequelize = require("../db");

const Budget = sequelize.define('budgets', {
    id: {
        type: DataTypes.UUID, 
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    currency: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    breakdown: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    proposalid: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
    },
    ipfs: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

Budget.associate = (models) => {
    Budget.belongsTo(models.proposals, { foreignKey: 'proposalid' });
    Budget.hasMany(models.invoices, {foreignKey: 'budgetid' });
}



module.exports = Budget;
