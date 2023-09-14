const express = require('express');
const cors = require('cors')
const siwe = require('siwe');
const session = require('express-session');
const { redisStore } = require('./utility/redis/redisClient');
const axios = require('axios');

require("dotenv").config();
const signJWTToken = require('./utility/middlewares/auth').signJWTToken;
const User = require('./Database/models/User');

const { startStandaloneServer } = require('@apollo/server/standalone');
const server = require('./schema/schema')
const context = require('./utility/middlewares/context');

const Moralis = require("moralis").default;
const { createSiweMessage, verifySiweMessageHandler } = require('./utility/signMessage');
const { init } = require('./Database/sequalizeConnection');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: true }));

const hour = 3600000;

app.use(session({
    name: 'siwe',
    secret: process.env.SESSION_SECRET,
    resave: false,
    expires: new Date(Date.now() + hour),
    saveUninitialized: false,
    store: redisStore,
}));

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

app.get("/", (req, res) => {
  res.send("Hey this is my API running 🥳");
});


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

    console.log(req.session.nonce);

    res.cookie('siwe', message, { httpOnly: true, secure: true, sameSite: 'none' });

    return res.status(200).json(message);
    }
);

app.post('/verify', async function (req, res) {
    console.log(req.session.nonce);
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
            return res.status(500).json("User not found");
        }

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

app.get('/logout', (req, res) => {
        if (req.session.test) {
            console.log(req.session.nonce);
            
            return res.status(200).json({ message: 'cookie cleared' });
        } else {
            return res.status(401).json({ error: 'Unauthorized: User not authenticated' });
        }
    }
);

app.get('/checkSiwe', (req, res) => {
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

        const nativeBalance = response.toJSON();
        
        let nativeCurrency;
        if (chain === "0x1") {
            nativeCurrency = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
        } else if (chain === "0x89") {
            nativeCurrency = "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270";
        } else if (chain === "0x4") {
            nativeCurrency = "0xc778417E063141139Fce010982780140Aa0cD5Ab";
        } else if (chain === "0x324") {
            nativeCurrency = "0xaBEA9132b05A70803a4E85094fD0e1800777fBEF";
        }

        const nativePrice = await Moralis.EvmApi.token.getTokenPrice({
            address: nativeCurrency, //WETH Contract
            chain: chain,
        });

        nativeBalance.usd = nativePrice.jsonResponse.usdPrice;
        console.log(nativeBalance.usd);

        res.send(nativeBalance);
    } catch (e) {
        res.send(e);
    }
});

app.get("/tokenBalances", async (req, res) => {

    try {
        const { address, chain } = req.query;

        const response = await Moralis.EvmApi.token.getWalletTokenBalances({
            address: address,
            chain: chain,
        });

        const tokens = response.toJSON();
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

app.get("/allowance", async (req, res) => {
    const { tokenAddress, walletAddress } = req.query;

    try {
        const response = await axios.get(
                `https://api.1inch.dev/swap/v5.2/1/approve/allowance?tokenAddress=${tokenAddress}&walletAddress=${walletAddress}`,
                {
                headers: {
                    accept: "*/*",
                    "Content-Type": "application/json",
                    Authorization: `Bearer mkOi8PEitK1DvNUL8kCzHRxBhQ5AtHIB`,
                },
                }
        );
        res.send(response.data);
    } catch (e) {
        res.send(e);
    }

});

app.get("/approve", async (req, res) => {
    const { tokenOneAddress } = req.query;

    try {
        const response = await axios.get(
          `https://api.1inch.dev/swap/v5.2/1/approve/transaction?tokenAddress=${tokenOneAddress}`,
          {
            headers: {
              accept: "*/*",
              "Content-Type": "application/json",
              Authorization: `Bearer mkOi8PEitK1DvNUL8kCzHRxBhQ5AtHIB`,
            },
          }
        );
        res.send(response.data);
    }   
    catch (e) {
        res.send(e);
    }
});



app.listen(8000, async () => {
    await init();

    const { url } = await startStandaloneServer(server, {
        listen: { port: 8080 },
        context: context
    });
    console.log('Server is running on port' + url);
});


module.exports = app;