const sequelize = require("./db");
require("dotenv").config();

sequelize.models = {
  Budget: require("./models/Budget"),
  Invoice: require("./models/Invoice"),
  Proposal: require("./models/Proposal"),
  User: require("./models/User"),
  Payment: require("./models/Payment"),
};

const init = async () => {
  await sequelize
    .sync()
    .then(() => console.log("Connection has been established successfully."))
    .catch((error) =>
      console.error("Unable to connect to the database:", error)
    );
};

module.exports =  init ;
