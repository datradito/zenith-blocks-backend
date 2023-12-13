const cors = require("cors");
const corsOptions = {
  credentials: true,
  origin: process.env.FRONTEND_URL,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 200,
};

module.exports = cors(corsOptions);

