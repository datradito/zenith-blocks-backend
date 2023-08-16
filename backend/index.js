const express = require('express');
const cors = require('cors')
const siwe = require('siwe');
const session = require('express-session');
const schema = require('./schema/schema');
const store = session.MemoryStore()

require("dotenv").config();
const signJWTToken = require('./utility/middlewares/auth').signJWTToken;
const hashUserData = require('./utility/middlewares/auth').hashUserData;
const checkAuth = require('./utility/middlewares/auth').checkAuth;
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');
const User = require('./Database/models/User');

const { AuthenticationError, ApolloServer } = require('apollo-server')
const { GraphQLError } = require('graphql');
const context = require('./utility/middlewares/context');

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

// const authenticationMiddleware = (req, res, next) => {
//     if (!req.headers.authorization) {
//         const authError = new AuthenticationError('AUTH_REQUIRED');
//         return next(authError);
//     }

//     const token = req.headers.authorization.split(' ')[1];

//     jwt.verify(token, JWT_SECRET, (err, decoded) => {
//         if (err) {
//             const authError = new AuthenticationError('TOKEN_EXPIRED');
//             return next(authError);
//         }

//         req.decoded = decoded;
//         next();
//     });
// };

//use authorize middleware here for each request 



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
        req.session.cookie.expires = new Date(Date.now() + hour);

        //Todo: once signature is verified find user from database based on address and retrieve daoId

        try {
            const user = await User.findOne({ where: { address: req.session.address } });

            if (!user) {
                return res.status(401).send(false);
            }

            const token = signJWTToken({ userAddress: user.address, dao: user.daoId });
            
            return res.status(201).json({ authToken: token });
        } catch (e) {
            console.log(e);
            return res.status(500).json("User not found");
        }
        

        // console.log(user);
        // hashUserData(user);

        //const token = jwt.sign({ userAddress: user.address, dao: user.daoId }, secretKey, { expiresIn: '1h' });

        // const user = {
        //     address: req.session.address,
        //     message: req.session.message,
        //     daoId: "eth.1inch",
        // }

        // req.session.save(() => {
        //     // const token = signJWTToken(user);
        //     return res.status(200).send(token);
        // });

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


app.post('/createUser', async (req, res) => {
    const { address, daoId } = req.body;

    const user = await User.create({ address, daoId });

    return res.status(200).json(user);
}
);

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
        
        console.log(response);
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

// const server = new ApolloServer({
//     schema,
//     formatError: (error) => {
//         if (error.originalError instanceof AuthenticationError) {
//             // Handle authentication errors here
//             return { message: error.message, code: 'AUTH_ERROR' };
//         }
//         // Return other errors as is
//         return error;
//     }
// });

app.use('/graphql',  graphqlHTTP({
    schema,
    context: context,
    graphiql: true,
}));

app.listen(8000, async () => {
    await init();
    console.log('Server is running on port 8000');
});
