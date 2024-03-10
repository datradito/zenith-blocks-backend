const getPathAfterBudgetId = (url) => {
    const regex = /budgetId([^]+)/;  // Corrected regular expression pattern
    const matches = url.match(regex);
    if (matches && matches.length > 1) {
        return matches[1];
    }
    return null;

}

export default getPathAfterBudgetId;