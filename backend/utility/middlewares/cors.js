const cors = require("cors");
const corsOptions = {
  credentials: true,
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200,
};

module.exports = cors(corsOptions);

