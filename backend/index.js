const express = require('express');
const app = express();
require("dotenv").config();
const cors = require('cors')

const UploadDataToIpfs = require('./utility/ipfs');

// Middleware to parse JSON bodies
app.use(express.json());

app.use(cors({
    origin: true,
    credentials: true
}))

app.post('/ipfs/uploadBudget', async (req, res) => {
    // Extract the content from the request body
    const { rootPath, jsonData } = req.body;
    const ipfsResponses = [];
    for (let data of jsonData) {
        let ipfsFilePath = rootPath + 'budgetId' + data.id;
        try {

            //Todo: Need to implement rate limit in case some items fail to upload
            const response= await UploadDataToIpfs(ipfsFilePath, data);
            ipfsResponses.push(response.jsonResponse[0].path);
        } catch (error) {
            console.error("Error uploading to IPFS:", error);
        }
    }
    
    res.json({ message: 'Proposal saved successfully', ipfsResponses });
});

app.post('/ipfs/uploadInvoice', async (req, res) => {
    // Extract the content from the request body
    const { rootPath, jsonData } = req.body;
    const ipfsResponses = [];
    for (let data of jsonData) {
        let ipfsFilePath = rootPath + 'InvoiceId' + data.id;
        try {

            //Todo: Need to implement rate limit in case some items fail to upload
            const response = await UploadDataToIpfs(ipfsFilePath, data);
            ipfsResponses.push(response.jsonResponse[0].path);
        } catch (error) {
            console.error("Error uploading to IPFS:", error);
        }
    }

    res.json({ message: 'Proposal saved successfully', ipfsResponses });
});


app.get('/', (req, res) => {
    // Extract the content from the request body
    console.log("content");
})


app.listen(8000, () => {
    console.log('Server is running on port 8000');
});


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

