const express = require('express');
const app = express();
require("dotenv").config();
const cors = require('cors')
const schema = require('./schema/schema');
var { graphqlHTTP } = require('express-graphql');
const port = 8000;
const Moralis = require("moralis").default;
// const session = require('express-session');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const createSiweMessage = require('./utility/signMessage');
// const getUserBalance = require('./utility/ipfs').getUserBalance;

const { init } = require('./Database/sequalizeConnection');

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
    
// }));


// init();

let isMoralisInitialized = false;

const initializeIpfsNode = async () => {
    if (!isMoralisInitialized) {
        // Initialize Moralis only if it hasn't been initialized before
        await Moralis.start({
            apiKey: process.env.MORALIS_KEY,
        });

        isMoralisInitialized = true; // Set the flag to true after initialization
    }
};

// Call the initialization function
initializeIpfsNode();


app.get("/tokenPrice", async (req, res) => {

    const { query } = req;

    const responseOne = await Moralis.EvmApi.token.getTokenPrice({
        address: query.addressOne
    })

    const responseTwo = await Moralis.EvmApi.token.getTokenPrice({
        address: query.addressTwo
    })

    const usdPrices = {
        tokenOne: responseOne.raw.usdPrice,
        tokenTwo: responseTwo.raw.usdPrice,
        ratio: responseOne.raw.usdPrice / responseTwo.raw.usdPrice
    }


    return res.status(200).json(usdPrices);
});



app.post("/siwe", async (req, res) => {
    const { address, network } = req.body;
    console.log(address, network);
    // const siweMessage = createSiweMessage(address, statement);
    // const signature = await Moralis.Web3.sign(siweMessage);
    const message = createSiweMessage(address, network, "1");
    console.log(message);
    return res.status(200).json(message);
    }
);


app.listen(8000, () => {
    console.log('Server is running on port 8000');
});
