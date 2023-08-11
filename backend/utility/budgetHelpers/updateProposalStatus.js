const Proposal = require('../../Database/models/Proposal');
const Budget = require('../../Database/models/Budget');

const updateProposalStatus = async (proposalId, currentBudgetAmount) => {

    //get sum of all budgeted amounts for this proposal
    const budget = await Budget.sum('amount', {
        where: {
            proposalid: proposalId
        }
    });

    //if currentBudgetAmount + budget = proposal, then update proposal status to "Funded"
    const proposal = await Proposal.findByPk(proposalId, {
        attributes: ['amount'],
    });

    console.log(proposal.get('amount'));
    console.log(budget);

    const proposalAmount = proposal.get('amount');
    const budgetedAmount = parseInt(currentBudgetAmount) + parseInt(budget || "0");

    if (parseInt(budgetedAmount) === parseInt(proposalAmount)) {
        try {
            const proposal = await Proposal.findByPk(proposalId);
            proposal.status = "Funded";
            await proposal.save();
        } catch (error) {
            console.log(error);
            throw new UserInputError("BudgetErrors : Unable to update proposal status", errors)
        }
    }
}

module.exports = updateProposalStatus;