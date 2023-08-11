const { AuthenticationError, UserInputError } = require('apollo-server')
const Budget = require("../Database/models/Budget");
const Proposal = require("../Database/models/Proposal");

const validateBudget = async (
        amount,
        proposalid,
) => {

    const errors = {}

    const proposal = await Proposal.findByPk(proposalid, {
        attributes: ['amount'],
    });
    
    const totalBudgetedAmount = await Budget.sum('amount', {
        where: {
            proposalid: proposalid
        }
    });

    const proposalAmount = proposal.get('amount');

    console.log(parseInt(proposalAmount) - parseInt(totalBudgetedAmount));

    if (parseInt(amount) > parseInt(proposalAmount) - parseInt(totalBudgetedAmount)) {
        errors.amount = "New Budget amount exceeds Proposal amount"
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}


module.exports = validateBudget;