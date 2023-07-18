const Moralis = require("moralis").default;
require("dotenv").config();

const initializeIpfsNode = async () => {
    await Moralis.start({
        apiKey: process.env.MORALIS_KEY,
    });
};

initializeIpfsNode();

const UploadDataToIpfs = async (ipfsFilePath, jsonData) => { // Wait for the Moralis node initialization

    const abi = [
        {
            path: ipfsFilePath,
            content: jsonData, // Use the actual Json data here
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

module.exports = UploadDataToIpfs ;
