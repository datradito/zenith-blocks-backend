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

    if (parseInt(amount) > parseInt(proposalAmount) - parseInt(totalBudgetedAmount)) {
        errors.amount = `Amount exceeds remaining proposal amount of ${parseInt(proposalAmount) - parseInt(totalBudgetedAmount)}`
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}


module.exports = validateBudget;