const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();


const createConnection = async () => {
    const connection = await mysql.createConnection('mysql://gv7tit0e18h0fhsb0mdz:pscale_pw_dko6FN2S12I88WYqX358r5azKxxgmHJE8NYb6Mbk4lo@aws.connect.psdb.cloud/zenithblocksdev?ssl={"rejectUnauthorized":true}');
    return connection;
};

const getDataByArgumentsQuery = `
  SELECT * FROM ?? WHERE ?? = ? AND totalamount > 0
`;

const createGetDataQuery = async (tableName, columnName, Value) => {
    try {
        const connection = await createConnection();
        
        const result = await connection.query(getDataByArgumentsQuery, [tableName, columnName, Value])
        if (result[0].length > 0) {
            return result[0];
        }
    } catch (err) {
        console.error('Error getting proposal data:', err);
    }
}

module.exports = { createGetDataQuery };