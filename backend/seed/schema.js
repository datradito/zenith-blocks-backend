export const dropProposalTableSQL = 'DROP TABLE IF EXISTS proposal';

export const createProposalTableSQL = `CREATE TABLE proposal (
  id VARCHAR(255) PRIMARY KEY,
  totalamount DECIMAL(10, 2) NOT NULL,
  modified DATETIME NOT NULL,
  modifier VARCHAR(255) NOT NULL,
  rootPath VARCHAR(255) NOT NULL,
  ipfsHash VARCHAR(255) NOT NULL,
  daoId VARCHAR(255) NOT NULL
)`;

