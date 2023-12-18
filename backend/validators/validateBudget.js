// const { AuthenticationError, UserInputError } = require('apollo-server')
import { AuthenticationError, UserInputError } from 'apollo-server';
import Budget from "../Database/models/Budget.js";
import Proposal from "../Database/models/Proposal.js";

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


export { validateBudget };