
export const transformInvoices = (invoices) => {  
    if(invoices === []) return null;
    
    invoices = invoices.map(invoice => {
        
        return {
          InvoiceId: invoice.id,
          Invoice: invoice.number,
          Recipient: `${invoice.recipient.slice(
            0,
            6
          )}...${invoice.recipient.slice(36)}`,
          RecipientAddress: invoice.recipient,
          OwnerAddress: invoice.owneraddress,
          Amount: invoice.total,
          Currency: invoice.currency,
          Category: invoice.category,
          Status: invoice.status,
          Description: invoice.description,
          Date: new Date(parseInt(invoice.date)).toLocaleDateString(),
          Due: new Date(parseInt(invoice.duedate)).toLocaleDateString(),
          View: "Details",
          Payment: "PAID",
          Action: "ACTION",
          transactionHash: invoice.transactionHash,
        };
    }
    );
    return invoices?.length > 0 ? invoices : null;
}

export const transformTransactionHistory = (transactions) => {
  transactions = transactions.map((transaction) => {
    const { __typename, Transaction, ...rest } = transaction;
    return rest;
  });
  return transactions?.length > 0 ? transactions : [];
};
