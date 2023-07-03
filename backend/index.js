const express = require('express');
const app = express();
require("dotenv").config();
const cors = require('cors')

const Moralis = require("moralis").default;
const { UploadBudgetToIpfs, getBudgetFromIpfs } = require('./utility/ipfs');

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
        let ipfsFilePath = rootPath + data.budgetId;
        try {

            //Todo: Need to implement rate limit in case some items fail to upload
            const ipfsResponse = await UploadBudgetToIpfs(ipfsFilePath, data);
            ipfsResponses.push(ipfsResponse);
        } catch (error) {
            console.error("Error uploading to IPFS:", error);
        }
    }
    res.json({ message: 'Proposal saved successfully', ipfsResponses });
});


app.get('/ipfs/getBudgets', (req, res) => {
    const ipfsFilePath = req.query.Path;
    getBudgetFromIpfs(ipfsFilePath)
        .then((budgets) => {
            res.json(budgets);
        })
        .catch((error) => {
            console.error("Error retrieving budgets from IPFS:", error);
            res.status(500).json({ error: "Internal Server Error" });
        });
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

