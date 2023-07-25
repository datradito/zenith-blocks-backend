
const { createProposalTableSQL, dropProposalTableSQL } = require('./schema.js');
const { createBudgetTableSQL } = require('./budgetSchema.js');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();


const connection = await mysql.createConnection(process.env.DATABASE_URL_DEV);
console.log('Connected to PlanetScale!');

const saveProposalTable = async () => {
    try {

        await connection.query(dropProposalTableSQL);
        console.log('***dropped proposal table***');

        await connection.query(createProposalTableSQL);
        console.log('***created proposals table***');
    } catch (err) {
        console.error(err);
    }
};

const alterProposalTable = async () => {
    const alterTableSQL = `
      ALTER TABLE proposal
      ADD COLUMN DaoId VARCHAR(255) NOT NULL;
    `;
    try {
        await connection.query(alterTableSQL);
        console.log('***added ipfsHash column to proposals table***');
    } catch (err) {
        console.error(err);
    }
};



const saveBudgetTable = async () => {
    try {
        await connection.query(createBudgetTableSQL);
        console.log('***created budget table***');
    } catch (err) {
        console.error(err);
    }
};
const main = async () => {
    // await saveProposalTable();
    // await saveBudgetTable();
    process.exit(0);
};

main();