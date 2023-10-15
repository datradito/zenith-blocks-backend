const express = require('express');

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const session = require('./utility/middlewares/session');
const cors = require('./utility/middlewares/cors');
const authRouter = require('./routes/authRoutes');
const axios = require('axios');

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


app.post("/tokenPrice", async (req, res) => {
    const { body } = req;
        const response = await axios.get(
          `https://api.1inch.dev/price/v1.1/1/${body.addresses}`,
          {
            params: {
              currency: "USD"
            },
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${process.env.REACT_APP_1INCH_API_KEY}`,
            },
          }
        );
        return res.status(200).json(response.data);
});

app.post('/createUser', async (req, res) => {
        const { address, daoId } = req.body;
        const user = await User.create({ address, daoId });
        return res.status(200).json(user);
    }
);


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
                    Authorization: `Bearer ${process.env.REACT_APP_1INCH_API_KEY}`,
                },
                }
        );
        res.send(response.data);
    } catch (e) {
        res.send(e);
    }

});

app.get("/approve", async (req, res) => {
    const { tokenOneAddress, amount } = req.query;

    try {
        const response = await axios.get(
          `https://api.1inch.dev/swap/v5.2/1/approve/transaction?tokenAddress=${tokenOneAddress}&amount=${Number(amount)}`,
          {
            headers: {
              accept: "*/*",
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.REACT_APP_1INCH_API_KEY}`,
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
    console.log('Apollo Server is running on port' + url);
});


module.exports = app;