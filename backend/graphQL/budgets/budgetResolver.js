const { GraphQLError } = require('graphql');
const Invoice = require('../../Database/models/Invoice');
const Budget = require('../../Database/models/Budget');
const validateBudget = require('../../validators/validateBudget');
const  updateProposalStatus = require('../../utility/budgetHelpers/updateProposalStatus')
const { throwCustomError, ErrorTypes } = require('../../utility//errorHandlerHelpers/errorHandlerHelper')

const budgetResolver = {
    Query: {
        getBudgetById: async (parent, args) => {
            try {
                return await Budget.findByPk(args.id);
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        },
        getBudgetsForProposal: async (parent, args) => {
            try {
                return await Budget.findAll({
                    where: { proposalid: args.proposalid }
                }, {
                    sort: {
                        createdAt: 'desc'
                    },
                    include: [{
                        model: Invoice,
                        as: 'invoices'
                    }]
                });
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        }
    },
    Mutation: {
        submitBudget: async (parent, args) => {
            const { amount, proposalid } = args.budget;

            const { errors, valid } = await validateBudget(
                amount,
                proposalid,
            )

            if (!valid) {
                throwCustomError(errors.amount, ErrorTypes.BAD_USER_INPUT);
            }

            let ipfsResponse;

            // try {
            //     const response = await UploadDataToIpfs(args.rootpath, JSON.stringify(args));
            //         ipfsResponse = response.jsonResponse[0].path;
            // } catch (error) {
            //     throw new UserInputError("BudgetErrors : Unable to load to IPFS, Will be tried again later!", errors)
            // }
            try {
                await updateProposalStatus(args.budget.proposalid, args.budget.amount);

                const budget = new Budget({
                    ...args.budget,
                    ipfs: ipfsResponse ? ipfsResponse : `Failed to upload to IPFS at ${new Date().toISOString()}`,
                });
                try {
                    return await budget.save();
                } catch (error) {
                    console.log(error);
                    throw new GraphQLError(error.message);
                }
                
            } catch (error) {
                console.log(error);
                throw new GraphQLError(error.message)
            }
        }
    }
}

module.exports = budgetResolver;