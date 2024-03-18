export const transformItems =(items, totalBudget) => {

    items = items.map(item => {
        const { action, breakdown, remaining, __typename, ...rest } = item;
        // const data = { ...rest, Breakdown: (parseInt(item.amount) / parseInt(totalBudget)) * 100, Remaining: parseInt(totalBudget - parseInt(item.amount))  , Invoices: 'INVOICE' };
                const data = {
                  ...rest,
                    Breakdown:
                        (parseInt(item.amount) / parseInt(totalBudget)) * 100,
                    remaining: item.remaining,
                  Invoices: "INVOICE",
                };
        return data;
    }
    );
    return items?.length > 0 ? items : null;
}

export const transformInvoices = (invoices) => {  
    if(invoices === []) return null;
    
    invoices = invoices.map(invoice => {
        
        return {
            InvoiceId: invoice.id,
            Invoice: invoice.number,
            Recipient: `${invoice.recipient.slice(0, 6)}...${invoice.recipient.slice(36)}`,
            RecipientAddress: invoice.recipient,
            Amount: invoice.total,
            Currency: invoice.currency,
            Status: invoice.status,
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
    transactions = transactions.map(transaction => {
        const { __typename, Transaction,  ...rest } = transaction;
        return rest;
    }
    );
    return transactions?.length > 0 ? transactions : [];
}

