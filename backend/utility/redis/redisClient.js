import redis from "redis";
import RedisStore from "connect-redis";
import dotenv from "dotenv";
dotenv.config();

const redisClient = redis.createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

redisClient.on("connect", () => {
  console.log(`Connected to Redis on ${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`);
});

redisClient.on("error", (err) => {
  console.log(err.message);
});

redisClient.on("ready", () => {
  console.log("Redis is ready");
});

redisClient.on("end", () => {
  console.log("Redis connection ended");
});


redisClient
  .connect()
  .then(() => {
    console.log("Connected to Redis");
  })
  .catch((err) => {
    console.log(err.message);
  });

const redisStore = new RedisStore({ client: redisClient });

export { redisClient, redisStore };