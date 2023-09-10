export const transformItems =(items, totalBudget) => {

    items = items.map(item => {
        const { action, breakdown, __typename, ...rest } = item;
        const data = { ...rest, Breakdown: (parseInt(item.amount) / parseInt(totalBudget)) * 100, Remaining: parseInt(totalBudget - parseInt(item.amount))  , Invoices: 'INVOICE' };
        return moveIdToFront(data);
    }
    );
    return items?.length > 0 ? items : null;
}

export const transformInvoices = (invoices) => {  
    
    invoices = invoices.map(invoice => {
        const { description, owneraddress, uploadinvoice, category , __typename, ...rest } = invoice;
        const data = {
            InvoiceId: invoice.id,
            Invoice: invoice.number,
            Recipient: `${invoice.recipient.slice(0, 6)}...${invoice.recipient.slice(36)}`,
            Amount: invoice.total,
            Currency: invoice.currency,
            Status: invoice.status,
            Date: new Date(parseInt(invoice.date)).toLocaleDateString(),
            Due: new Date(parseInt(invoice.duedate)).toLocaleDateString(),
            View: "Invoice",
            Payment: "PAID",
            Action: "ACTION",
        };
        return moveIdToFront(data);
    }
    );
    return invoices?.length > 0 ? invoices : null;
}



// function reverseObjectKeys(originalObject) {
//     const reversedKeys = Object.keys(originalObject).reverse();
//     const reversedObject = {};

//     for (const key of reversedKeys) {
//         reversedObject[key] = originalObject[key];
//     }

//     return reversedObject;
// }


function moveIdToFront(originalObject) {
    const { id, ...rest } = originalObject;
    return { id, ...rest };
}