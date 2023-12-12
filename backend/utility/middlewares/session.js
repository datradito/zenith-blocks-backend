const session = require("express-session");
const {redisStore} = require("../redis/redisClient");

module.exports = session({
  name: "Zenith",
  store: redisStore,
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 3600000, // session max age in miliseconds
  },
});
