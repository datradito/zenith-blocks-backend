const express = require('express');

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const session = require('./utility/middlewares/session');
const cors = require('./utility/middlewares/cors');
const authRouter = require('./routes/authRoutes');
const axios = require('axios');

require("dotenv").config();
const User = require('./Database/models/User');

const { startStandaloneServer } = require('@apollo/server/standalone');
const server = require('./schema/schema')
const context = require('./utility/middlewares/context');

const Moralis = require("moralis").default;
const init = require('./Database/sequalizeConnection');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors);
app.use(session);
app.use(authRouter);

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

app.post('/createUser', async (req, res) => {
        const { address, daoId } = req.body;
        const user = await User.create({ address, daoId });
        return res.status(200).json(user);
    }
);

app.get('/checkSiwe', async (req, res) => {
        if (req.session.test) {
            console.log(req.session.nonce);
            return res.status(200).json(req.session.siwe);
        } else {
            const users = await User.findAll();
            return res.status(401).json(users);
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