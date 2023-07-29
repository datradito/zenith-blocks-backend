// const mysql = require('mysql2/promise');
// const dotenv = require('dotenv');
// dotenv.config();


// const createConnection = async () => {
//     const connection = await mysql.createConnection(process.env.DATABASE_URL_DEV);
//     return connection;
// };

// const getDataByArgumentsQuery = `
//   SELECT * FROM ?? WHERE ?? = ? AND totalamount > 0
// `;

// const createGetDataQuery = async (tableName, columnName, Value) => {
//     try {
//         const connection = await createConnection();
        
//         const result = await connection.query(getDataByArgumentsQuery, [tableName, columnName, Value])
//         if (result[0].length > 0) {
//             return result[0];
//         }
//     } catch (err) {
//         console.error('Error getting proposal data:', err);
//     }
// }

// module.exports = { createGetDataQuery };