const Budget = require("../Database/models/Budget");
const Proposal = require("../Database/models/Proposal");
const Invoice = require("../Database/models/Invoice");

const getRemainingBudgetAmount = async (budgetid) => {
  const budget = await Budget.findByPk(budgetid);

  if (!budget) {
    throw new GraphQLError("Budget not found");
  }

  const invoices = await Invoice.findAll({
    where: { budgetid: budgetid },
  });

  let totalInvoiceAmount = 0;

  if (invoices.length === 0) {
    return parseInt(budget.amount);
  }

  invoices.forEach((invoice) => {
    totalInvoiceAmount += invoice.total;
  });
  return parseInt(budget.amount) - parseInt(totalInvoiceAmount);
};

module.exports = {
  getRemainingBudgetAmount,
};
