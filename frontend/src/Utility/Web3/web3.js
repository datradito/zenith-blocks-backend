import Web3 from 'web3';
import contractAbi from './contractAbi.json';

// Connect to the Ethereum network using Infura
const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/<your-project-id>'));

// Load the contract ABI
const contract = new web3.eth.Contract(contractAbi, '<your-contract-address>');

// Function to save IPFS hash to the contract
export const saveHashToContract = async (hash) => {
    // Get the current account
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];

    // Save the hash to the contract
    await contract.methods.saveHash(hash).send({ from: account });
}

// Function to get IPFS hash from the contract
export const getHashFromContract = async () => {
    // Get the current account
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];

    // Get the hash from the contract
    const hash = await contract.methods.getHash().call({ from: account });

    // Return the hash
    return hash;
}
