import { DataTypes } from "sequelize";
import sequelize from "../db.js";


const Contact = sequelize.define('contacts', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    daoid: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    safeaddress: {
        type: DataTypes.STRING,
        allowNull: false,
    },

});


export default Contact;
