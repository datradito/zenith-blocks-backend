const Proposal = require('../../Database/models/Proposal');
const Budget = require('../../Database/models/Budget');

const updateProposalStatus = async (proposalId, currentBudgetAmount) => {

    //get sum of all budgeted amounts for this proposal
    const totalBudgetedAmount = await Budget.sum('amount', {
        where: {
            proposalid: proposalId
        }
    });

    //if currentBudgetAmount + totalBudgetedAmount = proposalAmount, then update proposal status to "Funded"
    const proposalAmount = await Proposal.findByPk(proposalId, {
        attributes: ['amount'],
    });

    if (parseInt(currentBudgetAmount) + parseInt(totalBudgetedAmount) === parseInt(proposalAmount)) {
        const proposal = await Proposal.findByPk(proposalId);
        proposal.status = "Funded";
        await proposal.save();
    }
}

module.exports = updateProposalStatus;