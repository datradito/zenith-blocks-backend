export default function transformItems(item, totalBudget) {
    const { action, ...rest } = item;
    return { ...rest, Remaining: parseInt(totalBudget - parseInt(item["Allocated Budget"])), Invoices: 'INVOICE' };
}
