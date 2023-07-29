const { DataTypes } = require('sequelize');
const {sequelize} = require('../sequalizeConnection');

const Proposal = sequelize.define('Proposal', {
    id: {
        type: DataTypes.STRING.BINARY, // Use DataTypes.INTEGER if using auto-incrementing integer as primary key
        allowNull: false,
        primaryKey: true,
    },
    amount: {
        type: DataTypes.FLOAT,
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
    Proposal.hasMany(models.Budget, { foreignKey: 'proposalid' });
};

module.exports = Proposal;