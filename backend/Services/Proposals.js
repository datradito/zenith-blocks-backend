const getRemainingProposalAmount = (proposal) => {
    const totalBudget = proposal.budgets.reduce((acc, budget) => {
        return acc + budget.amount;
    }, 0);
    return proposal.totalBudget - totalBudget;
};


module.exports = {
    getRemainingProposalAmount,
};