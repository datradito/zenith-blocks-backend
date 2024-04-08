import useAuthStore from "../../store/modules/auth/index.ts";

async function sanitizeBillData(data, budgetid) {
  const {
    user: { address },
  } = useAuthStore.getState((state) => state);
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

async function transformBillsForTable(invoices) {
  
  invoices = invoices.map(async (invoice) => {
    return {
      InvoiceId: invoice.id,
      Invoice: invoice.number,
      Recipient: `${invoice.recipient.slice(0, 6)}...${invoice.recipient.slice(
        36
      )}`,
      RecipientAddress: invoice.recipient,
      Amount: invoice.total,
      Currency: invoice.currency,
      Status: invoice.status,
      Date: new Date(parseInt(invoice.date)).toLocaleDateString(),
      Due: new Date(parseInt(invoice.duedate)).toLocaleDateString(),
      View: "Details",
      Payment: "Payment",
      Action: "ACTION",
      transactionHash: invoice.transactionHash,
    };
  });
  return invoices?.length > 0 ? invoices : [];
}


export const billService = {
  sanitizeBillData,
  transformBillsForTable,
};


//here is where we calculate paid status, Calls the transaction service 
//and determine if selected transactionHash is ready to bepaid or not!
//this way we gotta rely on backend for status and transactionsHash, 
//also transactions service to give us the data based on tracation hash
//process both to determine can be paid or not