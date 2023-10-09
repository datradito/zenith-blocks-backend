
async function sanitizeInvoiceData(data, Budget, proposal) {
    const owneraddress = await sessionStorage.getItem("address");
    return {
              category: data.category,
              recipient: data.recipient,
              owneraddress: owneraddress,
              proposal: proposal.id,
              number: data.invoiceNumber,
              budgetid: Budget.id,
              total: parseInt(data.amount),
              currency: data.currency,
              date: data.date,
              duedate: data.dueDate,
              description: data.description,
              uploadinvoice: "placeholder for now",
            }
};



export const invoiceService = {
  sanitizeInvoiceData,
};
