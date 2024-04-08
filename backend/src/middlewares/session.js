import session from "express-session";
import { redisStore } from "../utility/redis/redisClient.js";

export default session({
  name: "zenith",
  store: redisStore,
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "none",
    maxAge: 3600000,
  },
});
