const express = require('express');
const app = express();
require("dotenv").config();
const cors = require('cors')

const Moralis = require("moralis").default;
const UploadBudgetToIpfs = require('./utility/ipfs.js');

// Middleware to parse JSON bodies
app.use(express.json());

app.use(cors({
    origin: true,
    credentials: true
}))

app.post('/ipfs/uploadBudget', (req, res) => {
    // Extract the content from the request body
    const { ipfsFilePath, jsonData } = req.body;
    console.log(ipfsFilePath, jsonData);

    // Call the UploadBudgetToIpfs function passing the content
    UploadBudgetToIpfs(ipfsFilePath, jsonData)
        .then(() => {
            res.json({ message: 'Data received and uploaded successfully' });
        })
        .catch(error => {
            console.error("Error uploading to IPFS:", error);
            res.status(500).json({ error: 'Failed to upload to IPFS' });
        });

    //send cid back to frontend to save in contract
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

