import { Sequelize } from "sequelize";

import Budget from "./models/Budget.js";
import Invoice from "./models/Invoice.js";
import Proposal from "./models/Proposal.js";
import Payment from "./models/Payment.js";
import User from "./models/User.js";
import Contact from "./models/Contacts.js";

Sequelize.models = {
  budgets: import("./models/Budget.js"),
  invoices: import("./models/Invoice.js"),
  proposals: import("./models/Proposal.js"),
  users: import("./models/User.js"),
  payments: import("./models/Payment.js"),
  contacts: import("./models/Contacts.js"),
  users: import("./models/User.js"),
};

const init = async () => {
  Budget.hasMany(Invoice);
  Invoice.belongsTo(Budget);
  Proposal.hasMany(Budget);
  Budget.belongsTo(Proposal);
  Invoice.hasMany(Payment);
  Payment.belongsTo(Invoice);
};

export default init;
