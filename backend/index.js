import express from "express";
import cors from "cors";
import session from "./src/middlewares/session.js";
import { corsOptions } from "./src/middlewares/cors.js";
import { authRouter } from "./src/routes/authRoutes.js";
import { swapRouter } from "./src/routes/1inchSwapRoutes.js";

import User from "./src/Database/models/User.js";
import { typeDefs, resolvers } from "./src/schema/schema.js";
import context  from "./src/middlewares/context.js";
import Moralis from "moralis";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import http from "http";

import init from "./src/Database/sequalizeConnection.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "production") {
  await import("dotenv").then((dotenv) => {
    dotenv.config();
  });
}

app.use(cors(corsOptions));
app.use(session);
app.use(authRouter);
app.use(swapRouter);

let isMoralisInitialized = false;

const httpServer = http.createServer(app);
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();
app.use(
  "/graphql",
  cors(),
  express.json(),
  expressMiddleware(server, {
    context: context,
  })
);

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

app.post("/createUser", async (req, res) => {
  try {
    const { address, daoid } = req.body;
    const user = await User.create({
      address: address,
      daoid: daoid,
    });
    res.send({
      message: "User created",
      user: user
    });
  } catch (e) {
    res.send({
      message: "Error creating user", error: e
    });
  }
}
);

httpServer.listen(8000, async () => {
  await init();
  console.log("Server running on port 8000");
});

export default app;
