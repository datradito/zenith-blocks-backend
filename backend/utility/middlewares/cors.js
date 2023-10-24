const cors = require("cors");
const corsOptions = {
  credentials: true,
  origin:"*",
  optionsSuccessStatus: 200,
};

module.exports = cors(corsOptions);

