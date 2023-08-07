const express = require('express');
const cors = require('cors')
const siwe = require('siwe');
const session = require('express-session');
const schema = require('./schema/schema');
const store = session.MemoryStore()

require("dotenv").config();

var { graphqlHTTP } = require('express-graphql');

const Moralis = require("moralis").default;
const { createSiweMessage, createNonce, verifySiweMessageHandler } = require('./utility/signMessage');
const { init } = require('./Database/sequalizeConnection');

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: true,
    credentials: true,
}));

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
const authenticationMiddleware = (req, res, next) => {
    if (req.session.id) {
        // If the user is authenticated, proceed to the next middleware or route handler.
        next();
    } else {
        // If the user is not authenticated, return a 401 Unauthorized status and an error message.
        res.status(401).json({ error: 'Unauthorized: User not authenticated' });
    }
};


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


app.post("/siwe", async (req, res) => {
    const { address, network } = req.body;

    // console.log("from siwe " + JSON.stringify(req.body));
    const nonce = await createNonce();

    const message = createSiweMessage(address, network, nonce);

    req.session.nonce = nonce;
    req.session.address = address;
    req.session.message = message;
    req.session.save();

    res.cookie('siwe', message, { httpOnly: true, secure: true, sameSite: 'none' });

    console.log(req.session.id)
    return res.status(200).json(message);
    }
);

app.post('/verify', async function (req, res) {
        if (!req.body.message || !req.body.signature) {
            res.status(422).json({ message: 'Expected message and signature object as body.' });
            return;
        }

        // const siweCookie = req.headers.cookie?.split(';').find(cookie => cookie.trim().startsWith('siwe='));

    const { signature, message } = req.body;
    try {
        const { address, profileId, expirationTime } = await Moralis.Auth.verify({ message, signature, network: 'evm' });

        console.log(profileId, expirationTime, address)

        req.session.cookie.expires = expirationTime;
        req.session.save(() => res.status(200).send(true));
        
    } catch (e) {
        console.log(e)
        req.session.save(() => res.json({ message: e.message }));
    }


    
        // verifySiweMessageHandler(message, signature, nonce)
        //     .then(({message}) => {
        //     req.session.cookie.expires = new Date(Date.now() + hour);
        //     req.session.save(() => res.status(200).send(true));
        // }).catch((error) => {
        //     req.session.siwe = null;
        //     req.session.nonce = null;
        //     req.session.save(() => res.status(422).json({ message: error.message }));
        // }
        // )
    // } catch (e) {
    //     req.session.siwe = null;
    //     req.session.nonce = null;
        // switch (e) {
        //     case ErrorTypes.EXPIRED_MESSAGE: {
        //         req.session.save(() => res.status(440).json({ message: e.message }));
        //         break;
        //     }
        //     case ErrorTypes.INVALID_SIGNATURE: {
        //         req.session.save(() => res.status(422).json({ message: e.message }));
        //         break;
        //     }
        //     default: {
        //         req.session.save(() => res.status(500).json({ message: e.message }));
        //         break;
        //     }
        // }
    //     req.session.save(() => res.json({ message: e.message }));
    // }
});

app.get('/test', async(req, res) => {
    console.log(req.session.id);

    req.session.test = true
    const nonce = await createNonce();
    console.log(nonce)
    req.session.nonce = nonce;
    req.session.save();
    return res.status(200).json({ message: 'User logged out' });
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
