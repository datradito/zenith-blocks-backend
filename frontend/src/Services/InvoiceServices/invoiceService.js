import useAuthStore from "../../store/modules/auth/index.ts";

async function sanitizeInvoiceData(data, budgetid) {
  const { user: {address}} = useAuthStore.getState(state => state);
  return {
    category: data.category.name,
    recipient: data.recipient.address,
    owneraddress: address,
    number: data.invoiceNumber,
    budgetid: budgetid,
    total: parseInt(data.amount),
    currency: data.currency.name,
    date: data.date,
    duedate: data.dueDate,
    description: data.description,
  };
}

export const invoiceService = {
  sanitizeInvoiceData,
};
