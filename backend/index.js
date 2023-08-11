const express = require('express');
const cors = require('cors')
const siwe = require('siwe');
const session = require('express-session');
const schema = require('./schema/schema');
const store = session.MemoryStore()

require("dotenv").config();
const signJWTToken = require('./utility/middlewares/auth').signJWTToken;

var { graphqlHTTP } = require('express-graphql');

const Moralis = require("moralis").default;
const { createSiweMessage, verifySiweMessageHandler } = require('./utility/signMessage');
const { init } = require('./Database/sequalizeConnection');

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors({
//     origin: 'http://localhost:3000',
//     credentials: true,
// }));
app.use(cors({ credentials: true, origin: true }));

const hour = 3600000

app.use(session({
    name: 'siwe',
    secret: process.env.SESSION_SECRET,
    resave: false,
    expires: new Date(Date.now() + hour),
    saveUninitialized: false,
    store
}));

//create middleware here to check if req.session.authenticated is true 
//if it is true then allow the request to continue
//if it is false then return a 401 status code
const authorize = (req, res, next) => {
    if (!req.headers.authorization) return res.status(401).json({ message: 'This route requires authentication' });

    const token = req.headers.authorization.split(' ')[1];

    // Verify the token sent to us from client
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'The token is invalid' });

        // We want to set our payload on a request object so we can use it in our authorized endpoints
        req.decoded = decoded;
        next();
    })
}


// init();

let isMoralisInitialized = false;

const initializeIpfsNode = async () => {
    if (!isMoralisInitialized) {
        await Moralis.start({
            apiKey: process.env.MORALIS_KEY,
        });

        isMoralisInitialized = true;
    }
};

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

app.get('/nonce', function (_, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.send(siwe.generateNonce());
});


app.post("/siwe", async (req, res) => {
    const { address, network, nonce } = req.body;

    //check if user exist in db with daoId and address

    const message = createSiweMessage(address, network, nonce);

    req.session.nonce = nonce;
    req.session.address = address;
    req.session.message = message;
    req.session.save();

    res.cookie('siwe', message, { httpOnly: true, secure: true, sameSite: 'none' });

    return res.status(200).json(message);
    }
);

app.post('/verify', async function (req, res) {
    try {
        if (!req.body.message) {
            res.status(422).json({ message: 'Expected prepareMessage object as body.' });
            return;
        }

        let SIWEObject = new siwe.SiweMessage(req.body.message);
        const { data: message } = await SIWEObject.verify({ signature: req.body.signature, nonce: req.session.nonce });

        req.session.siwe = message;
        req.session.cookie.expires = new Date(message.expirationTime);

        // const user = {
        //     address: req.session.address,
        //     message: req.session.message,
        //     daoId: "eth.1inch",
        // }

        req.session.save(() => {
            // const token = signJWTToken(user);
            return res.status(200).send(true);
        });

    } catch (e) {
        req.session.siwe = null;
        req.session.nonce = null;

        switch (e) {
            default: {
                req.session.save(() => res.status(500).send(false));
                break;
            }
        }
    }
});


app.get('/test', async (req, res) => {

    console.log(req.session.id);
    if (!req.session.siwe) {
        res.status(401).send(false);
        return;
    }
    console.log("User is authenticated!");
    res.setHeader('Content-Type', 'text/plain');
    res.send(true);
    }
);

app.get('/logout', (req, res) => {
    console.log(req.session.id);

    if (req.session.test) {
        console.log(req.session.nonce);
        
        return res.status(200).json({ message: 'cookie cleared' });
    } else {
        return res.status(401).json({ error: 'Unauthorized: User not authenticated' });
    }
}
);

// app.use('/graphql', authenticationMiddleware, graphqlHTTP({
//     schema,
//     graphiql: true,
//     context: { session: session },
// }));

app.get('/checkSiwe', (req, res) => {
    console.log(req.session.id);
    console.log("from  check siwe")
    if (req.session.test) {
        console.log(req.session.nonce);
        return res.status(200).json(req.session.siwe);
    } else {
        return res.status(401).json({ error: 'Unauthorized: User not authenticated' });
    }
}
);

app.get("/nativeBalance", async (req, res) => {

    try {
        const { address, chain } = req.query;

        const response = await Moralis.EvmApi.balance.getNativeBalance({
            address: address,
            chain: chain,
        });

        const nativeBalance = response.jsonResponse;

        let nativeCurrency;
        if (chain === "0x1") {
            nativeCurrency = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
        } else if (chain === "0x89") {
            nativeCurrency = "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270";
        }

        const nativePrice = await Moralis.EvmApi.token.getTokenPrice({
            address: nativeCurrency, //WETH Contract
            chain: chain,
        });

        console.log(nativePrice);

        nativeBalance.usd = nativePrice.jsonResponse.usdPrice;

        res.send(nativeBalance);
    } catch (e) {
        res.send(e);
    }
});

//GET AMOUNT AND VALUE OF ERC20 TOKENS

app.get("/tokenBalances", async (req, res) => {

    try {
        const { address, chain } = req.query;

        const response = await Moralis.EvmApi.token.getWalletTokenBalances({
            address: address,
            chain: chain,
        });

        const tokens = response.jsonResponse;
        const legitTokens = [];

        console.log(tokens);

        for (const token of tokens) {
            try {
                const priceResponse = await Moralis.EvmApi.token.getTokenPrice({
                    address: token.token_address,
                    chain: chain,
                });

                if (priceResponse.jsonResponse.usdPrice > 0.01) {
                    token.usd = priceResponse.jsonResponse.usdPrice;
                    legitTokens.push(token);
                } else {
                    console.log("💩 coin");
                }
            } catch (e) {
                console.log(e);
            }
        }
        res.send(legitTokens);
    } catch (e) {
        res.send(e);
    }
});

//GET Users NFT's

app.get("/nftBalance", async (req, res) => {

    try {
        const { address, chain } = req.query;

        const response = await Moralis.EvmApi.nft.getWalletNFTs({
            address: address,
            chain: chain,
        });

        const userNFTs = response.data;

        res.send(userNFTs);
    } catch (e) {
        res.send(e);
    }
});

//GET USERS TOKEN TRANSFERS

app.get("/tokenTransfers", async (req, res) => {

    try {
        const { address, chain } = req.query;

        const response = await Moralis.EvmApi.token.getWalletTokenTransfers({
            address: address,
            chain: chain,
        });

        const userTrans = response.data.result;

        let userTransDetails = [];

        for (let i = 0; i < userTrans.length; i++) {

            try {
                const metaResponse = await Moralis.EvmApi.token.getTokenMetadata({
                    addresses: [userTrans[i].address],
                    chain: chain,
                });
                if (metaResponse.data) {
                    userTrans[i].decimals = metaResponse.data[0].decimals;
                    userTrans[i].symbol = metaResponse.data[0].symbol;
                    userTransDetails.push(userTrans[i]);
                } else {
                    console.log("no details for coin");
                }
            } catch (e) {
                console.log(e);
            }

        }

        res.send(userTransDetails);
    } catch (e) {
        res.send(e);
    }
});


app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}));

app.listen(8000, async () => {
    await init();
    console.log('Server is running on port 8000');
});
