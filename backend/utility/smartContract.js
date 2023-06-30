const Moralis = require("moralis").default;
const Web3 = require('web3');
const IPFScontract = require('./contracts/IPFSContract.json');
const contractAddress = '0x0ECa59cE22c05837AF9Df45fC2EcB1b126632Cf3';
const { EvmChain } = require("@moralisweb3/common-evm-utils");
const express = require('express');

//create express app
const app = express();

// Create a Web3 instance
if (typeof web3 !== 'undefined') {
    var web3 = new Web3(web3.currentProvider);
} else {
    var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
}

// Get the contract instance
const networkId = await web3.eth.net.getId();
const deployedNetwork = IPFScontract.networks[networkId];
const contract = new web3.eth.Contract(
    IPFScontract.abi,
    deployedNetwork.address
);

const UploadToIpfs = async () => {
    await Moralis.start({
        apiKey: process.env.MORALIS_KEY,
    });

    const abi = [
        {
            path: "YOUR_FILE_PATH",
            content: "YOUR_JSON_OR_BASE64",
        },
    ];

    try {
        const response = await Moralis.EvmApi.ipfs.uploadFolder({ abi });

    }
    catch (error) {
        console.error("Error uploading to IPFS:", error);
        // Handle the error or throw it to propagate to the caller
        throw error;
    }

    //if response successfull call saveCidToContract
    console.log(response.toJSON());
};

// let proposalJson = {
//     "daoId" : {
//         "proposalId" : "cid"
//     }
// };
// let budgetJson = {
//     "proposalId" : {
//         "budgetId" : "cid"
//     }
// };
// let invoiceJson = {
//     "budget" : {
//         "invoiceId" : "cid"
//     }
// };


const saveCidToContract = async (daoId, proposalId, cid) => {
    contract.methods.setCIDForProposal(daoId, proposalId, cid).send({ from: "0x12EC8Ac7DA760d11E3452e3315f57804BD3a99f4" });
}

