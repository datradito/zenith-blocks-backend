const { DataTypes } = require('sequelize');
const { sequelize } = require("../sequalizeConnection")

const InvoiceLines = sequelize.define('InvoiceLines', {
    id: {
        type: DataTypes.UUID, 
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    price: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    notes: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    invoiceid: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    budgetid: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ipfs: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

InvoiceLines.associate = (models) => {
    InvoiceLines.belongsTo(models.Invoice, { foreignKey: 'invoiceid' });
    InvoiceLines.belongsTo(models.Budget, { foreignKey: 'budgetid' });
}

module.exports = InvoiceLines;