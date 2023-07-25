// db.js
import mysql from 'mysql2';

const pool = mysql.createPool({
    connectionLimit: 10,
    ssl: '{"rejectUnauthorized":false}',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0 // Adjust as needed
}).promise();

async function testQuery() {
    const [rows] = await pool.query('SELECT * from users');
    return rows;
}
const result = testQuery();
console.log(result)

module.exports = pool;
