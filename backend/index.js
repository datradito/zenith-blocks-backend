import express from "express";
import cors from "cors";
import session from "./src/middlewares/session.js";
import { corsOptions } from "./src/middlewares/cors.js";
import { authRouter } from "./src/routes/authRoutes.js";

import User from "./src/Database/models/User.js";
import { typeDefs, resolvers } from "./src/schema/schema.js";
import context from "./src/middlewares/context.js";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import http from "http";

import { initDatabase } from "./src/Database/initDatabase.js";

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

app.get("/", (req, res) => {
  res.send("Hey this is my API running 🥳");
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
      user: user,
    });
  } catch (e) {
    res.send({
      message: "Error creating user",
      error: e,
    });
  }
});

const PORT = process.env.PORT || 8000;

httpServer.listen(PORT, async () => {
  try {
    await initDatabase();
    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    console.error("Failed to initialize the database:", error);
    process.exit(1); // Exit process with failure
  }
});
export default app;
