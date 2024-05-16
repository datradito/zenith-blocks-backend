import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import { PROPOSAL_STATUS } from "../../utility/constants/ProposalStatuses.js";

const Proposal = sequelize.define('proposals', {
    id: {
        type: DataTypes.STRING.BINARY, 
        primaryKey: true,
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: PROPOSAL_STATUS.CLOSED,
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
    currency: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    indexes: [
        {
            name: "proposal_daoid",
            fields: ["daoid"],
        },
    ]
});


export default Proposal;