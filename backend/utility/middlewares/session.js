const session = require("express-session");
const {redisStore} = require("../redis/redisClient");

module.exports = session({
  name: "siwe",
  store: redisStore,
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false,
  cookie: {
    secure: true,
    httpOnly: true,
    maxAge: 3600000, // session max age in miliseconds
  },
});
