import Budget from "../Database/models/Budget.js";
import Invoice from "../Database/models/Invoice.js";
import Proposal from "../Database/models/Proposal.js";

export const getRemainingBudgetAmount = async (budgetId) => {
  const budget = await Budget.findByPk(budgetId);

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
