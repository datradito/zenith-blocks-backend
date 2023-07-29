const { DataTypes } = require('sequelize');
const { sequelize } = require('../sequalizeConnection');

const Budget = sequelize.define('Budget', {
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
    Budget.belongsTo(models.Proposal, { foreignKey: 'proposalid' });
    Budget.hasMany(models.Invoice, {foreignKey: 'budgetid' });
}



module.exports = Budget;
