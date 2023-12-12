const express = require('express');
const cookieParser = require("cookie-parser");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const session = require('./utility/middlewares/session');
const cors = require('./utility/middlewares/cors');
const authRouter = require('./routes/authRoutes');
const swapRouter = require('./routes/1inchSwapRoutes');

const User = require('./Database/models/User');

const { startStandaloneServer } = require('@apollo/server/standalone');
const server = require('./schema/schema')
const context = require('./utility/middlewares/context');

const Moralis = require("moralis").default;
const init = require('./Database/sequalizeConnection');

const app = express();

if (app.get("env") === "production") {
  app.set("trust proxy", 1); // trust first proxy
  session.cookie.secure = true; // serve secure cookies
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors);
app.use(session);
app.use(authRouter);
app.use(swapRouter);

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

app.post('/createUser', async (req, res) => {

    try {
        const { address, daoId } = req.body;
        const user = await User.create({ address, daoId });
        return res.status(200).json(user);
    } catch (e) {
        res.status(500).json(e);
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

app.listen(8000, async () => {
    await init();
    const { url } = await startStandaloneServer(server, {
        listen: { port: 8080 },
        context: context
    });
    console.log('Apollo Server is running on port' + url);
});


module.exports = app;
