const BudgetType = require('./typeDefs');
const { GraphQLNonNull, GraphQLString, GraphQLFloat } = require('graphql');
const validateBudget = require('../../validators/validateBudget');
const Budget = require("../../Database/models/Budget")
const UploadDataToIpfs = require('../../utility/ipfs'); 

const { AuthenticationError, UserInputError } = require('apollo-server')

const updateProposalStatus = require('../../utility/budgetHelpers/updateProposalStatus');

const submitBudget = {
    type: BudgetType,
    args: {
        category: { type: new GraphQLNonNull(GraphQLString) },
        amount: { type: new GraphQLNonNull(GraphQLFloat) },
        currency: { type: new GraphQLNonNull(GraphQLString) },
        breakdown: { type: new GraphQLNonNull(GraphQLFloat) },
        proposalid: { type: new GraphQLNonNull(GraphQLString) },
        rootpath: { type: new GraphQLNonNull(GraphQLString) },
    },
    async resolve(parent, args) {

        const { valid, errors } = validateBudget(
                args.amount,
                args.proposalid,
        )
        if (!valid) {
            throw new UserInputError("BudgetErrors : Amount cannot exceed Proposal Allocated Total",  errors )
        }

    
        let ipfsResponse;

        try {
            const response = await UploadDataToIpfs(args.rootpath, JSON.stringify(args));
                ipfsResponse = response.jsonResponse[0].path;
        } catch (error) {
            throw new UserInputError("BudgetErrors : Unable to load to IPFS, Will be tried again later!", errors)
        }

        const budget = new Budget({
            ...args,
            ipfs: ipfsResponse ? ipfsResponse : `Failed to upload to IPFS at ${new Date().toISOString()}`,
        });

        //update proposal status
        await updateProposalStatus(args.proposalid, args.amount);

        return await budget.save();
    },
};


module.exports = {
    submitBudget
}