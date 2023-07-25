const mysql = require('mysql2/promise');
const dotenv= require('dotenv');
dotenv.config();


const createConnection = async () => {
    const connection = await mysql.createConnection('mysql://gv7tit0e18h0fhsb0mdz:pscale_pw_dko6FN2S12I88WYqX358r5azKxxgmHJE8NYb6Mbk4lo@aws.connect.psdb.cloud/zenithblocksdev?ssl={"rejectUnauthorized":true}');
    return connection;
};

const createProposalQuery = (args) => {
    const {
        Id,
        Amount,
        Modified,
        Modifier,
        RootPath,
        IpfsHash,
        DaoId
    } = args;

    const insertProposalQuery = `
    INSERT INTO proposal (id,totalamount, modified, modifier, rootPath, ipfsHash, daoId)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

    const queryParams = [
        Id,
        Amount,
        Modified,
        Modifier,
        RootPath,
        IpfsHash,
        DaoId
    ];

    return { query: insertProposalQuery, params: queryParams };
};

const insertProposalData = async (args) => {
    try {
        const connection = await createConnection();
        console.log('Connected to PlanetScale!');
        const { query, params } = createProposalQuery(args);
        const [result] = await connection.execute(query, params);
        if (result.affectedRows === 1) {
            console.log('Proposal data inserted successfully');
            return result;
        } else {
            console.error('Failed to insert proposal data');
        }
        connection.end(); // Don't forget to close the connection after use
    } catch (err) {
        console.error('Error inserting proposal data:', err);
    }
};

module.exports = { insertProposalData };

