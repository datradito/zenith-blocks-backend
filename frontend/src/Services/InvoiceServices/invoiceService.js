async function sanitizeInvoiceData(data, Budget) {
  // const owneraddress = await sessionStorage.getItem("address");
  return {
    category: data.category,
    recipient: data.recipient,
    owneraddress: data.owneraddress,
    number: data.invoiceNumber,
    budgetid: Budget.id,
    total: parseInt(data.amount),
    currency: data.currency,
    date: data.date,
    duedate: data.dueDate,
    description: data.description,
  };
}

export const invoiceService = {
  sanitizeInvoiceData,
};
