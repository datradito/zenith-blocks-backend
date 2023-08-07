const { AuthenticationError, UserInputError } = require('apollo-server')
const Budget = require("../Database/models/Budget");
const Proposal = require("../Database/models/Proposal");

const validateBudget = async (
        amount,
        proposalid,
) => {

    const errors = {}

    console.log("this running")

    const proposalAmount = await Proposal.findByPk(proposalid, {
        attributes: ['amount'],
    });

    console.log(proposalAmount)
    
    const totalBudgetedAmount = await Budget.sum('amount', {
        where: {
            proposalid: proposalid
        }
    });

    console.log(totalBudgetedAmount)

    console.log(amount)
    console.log(proposalAmount - totalBudgetedAmount < amount)

    if (amount > parseInt(proposalAmount) - parseInt(totalBudgetedAmount)) {
        errors.amount = "New Budget amount exceeds Proposal amount"
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}


module.exports = validateBudget;