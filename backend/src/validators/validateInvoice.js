import Budget from "../Database/models/Budget.js";
import Invoice from "../Database/models/Invoice.js";
import { GraphQLError } from "graphql";

const validateInvoice = (Category, Recipient, InvoiceNumber, Description) => {
  const errors = {};

  if (Category && Category.trim() === "") {
    errors.Category = "Category Cant be empty";
  }
  if (Recipient && Recipient.trim() === "") {
    errors.Recipient = "Recipient Cant be empty";
  } else {
    const ethereumAddressRegex = /^(0x)?[0-9a-f]{40}$/i;
    if (!Recipient.match(ethereumAddressRegex)) {
      errors.Recipient = "Recipient Not Valid";
    }
  }

  if (InvoiceNumber && InvoiceNumber.trim() === "") {
    errors.InvoiceNumber = "Invoice Number Cant be empty";
  }

  if (Description?.trim() === "") {
    errors.Description = "Description Cant be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

//invoice takes an id of budget - calculates total of all invoices for budget and compares to budget amount - only allow invoice creation if amount is less than budget amount
//if invoice amount is greater than budget amount, throw error
//if invoice amount is less than budget amount, create invoice
const validateInvoiceAmount = async (budgetid, total) => {
  const errors = {};

  const budget = await Budget.findByPk(budgetid);
  if (!budget) {
    errors.budget = "Budget not found";
  }

  const invoices = await Invoice.findAll({
    where: { budgetid: budgetid },
  });

  let totalInvoiceAmount = 0;

  if (invoices.length !== 0) {
    invoices.forEach((invoice) => {
      totalInvoiceAmount += invoice.total;
    });
  }

  if (totalInvoiceAmount + total > budget.amount) {
    errors.total = "Invoice amount exceeds remaining budget amount";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

export { validateInvoice, validateInvoiceAmount };
