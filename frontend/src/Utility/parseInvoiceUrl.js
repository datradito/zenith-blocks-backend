export const parseInvoiceUrl = (url) => {
    const regex = /^\/budgets\/([a-zA-Z0-9-]+)\/invoices$/;
    const match = url.match(regex);

    if (match) {
        const budgetId = match[1];

        return {
            budgetId,
        };
    }

    return null;
};
