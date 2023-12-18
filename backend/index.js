import express from "express";
import cors from "cors";
import session from "./utility/middlewares/session.js";
import { corsOptions } from "./utility/middlewares/cors.js";
import { authRouter } from "./routes/authRoutes.js";
import { swapRouter } from "./routes/1inchSwapRoutes.js";

import User from "./Database/models/User.js";
import { typeDefs, resolvers } from "./schema/schema.js";
import context from "./utility/middlewares/context.js";
import Moralis from "moralis";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import http from "http";

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

app.get("/", (req, res) => {
  res.send("Hey this is my API running 🥳");
});

app.post("/createUser", async (req, res) => {
  const { address, daoId } = req.body;
  const user = await User.create({ address, daoId });
  return res.status(200).json(user);
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


httpServer.listen(8000, async () => {
  console.log("Server running on port 8000");
});

export default app;
