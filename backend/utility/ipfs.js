const Moralis = require("moralis").default;
require("dotenv").config();

const initializeIpfsNode = async () => {
    await Moralis.start({
        apiKey: process.env.MORALIS_KEY,
    });
};

initializeIpfsNode();

const UploadBudgetToIpfs = async (ipfsFilePath, jsonData) => { // Wait for the Moralis node initialization

    const abi = [
        {
            path: ipfsFilePath,
            content: jsonData, // Use the actual budgetJson data here
        },
    ];

    try {
        const response = await Moralis.EvmApi.ipfs.uploadFolder({ abi });
        return response;
    } catch (error) {
        console.error("Error uploading to IPFS:", error);
        throw error; 
    }
};

const getBudgetFromIpfs = async (ipfsFilePath) => {
    try {
        const response = await Moralis.EvmApi.ipfs.getFolder({ path: ipfsFilePath });
        return response; // Return the response if needed
    } catch (error) {
        console.error("Error uploading to IPFS:", error);
        throw error; // Throw the error to propagate to the caller
    }
};

module.exports = { UploadBudgetToIpfs, getBudgetFromIpfs };
