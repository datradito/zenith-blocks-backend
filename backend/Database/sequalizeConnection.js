const sequelize = require("./db");
require("dotenv").config();
const Budget = require("./models/Budget");
const Invoice = require("./models/Invoice");
const Proposal = require("./models/Proposal");
const Payment = require("./models/Payment");


sequelize.models = {
  budgets: require("./models/Budget"),
  invoices: require("./models/Invoice"),
  proposals: require("./models/Proposal"),
  users: require("./models/User"),
  payments: require("./models/Payment"),
};

const init = async () => {
  Budget.hasMany(Invoice);
  Invoice.belongsTo(Budget);
  Proposal.hasMany(Budget);
  Budget.belongsTo(Proposal);
  Invoice.hasMany(Payment);
  Payment.belongsTo(Invoice);
  // await sequelize
  //   .sync({alter: true})
  //   .then(() => console.log("Connection has been established successfully."))
  //   .catch((error) =>
  //     console.error("Unable to connect to the database:", error)
  //   );
};

module.exports =  init ;
