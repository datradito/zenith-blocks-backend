export default function transformItems(items, totalBudget) {
    console.log('transformItems', items);
    items = items.map(item => {
        const { action, __typename, ...rest } = item;
        return { ...rest, Remaining: parseInt(totalBudget - parseInt(item.amount)), Invoices: 'INVOICE' };
    }
    );
    return items?.length > 0 ? items : null;
}
