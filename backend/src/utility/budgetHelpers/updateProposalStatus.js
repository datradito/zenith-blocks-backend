import Budget from "../../Database/models/Budget.js";
import Proposal from "../../Database/models/Proposal.js";

const updateProposalStatus = async (proposalId, currentBudgetAmount) => {

    //get sum of all budgeted amounts for this proposal
    const budget = await Budget.sum('amount', {
        where: {
            proposalid: proposalId
        }
    });

    console.log(budget);

    //if currentBudgetAmount + budget = proposal, then update proposal status to "Funded"
    const proposal = await Proposal.findByPk(proposalId, {
        attributes: ['amount'],
    });

    console.log(proposal.toJSON());

    const proposalAmount = proposal.get('amount');
    const budgetedAmount = parseInt(currentBudgetAmount) + parseInt(budget || "0");

    console.log(budgetedAmount);
    console.log(proposalAmount);

    if (parseInt(budgetedAmount) === parseInt(proposalAmount)) {
        try {
            const proposal = await Proposal.findByPk(proposalId);
            proposal.status = "Funded";
            await proposal.save();
        } catch (error) {
            throw new UserInputError("BudgetErrors : Unable to update proposal status", error)
        }
    }
}

export default updateProposalStatus;