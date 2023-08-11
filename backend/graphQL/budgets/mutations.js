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

        const { errors , valid } = await validateBudget(
                args.amount,
                args.proposalid,
        )

        console.log(errors, valid)
        if (!valid) {
            throw new UserInputError("BudgetErrors : Amount cannot exceed Proposal Allocated Total",  errors )
        }

    
        let ipfsResponse;

        // try {
        //     const response = await UploadDataToIpfs(args.rootpath, JSON.stringify(args));
        //         ipfsResponse = response.jsonResponse[0].path;
        // } catch (error) {
        //     throw new UserInputError("BudgetErrors : Unable to load to IPFS, Will be tried again later!", errors)
        // }
        try {
            await updateProposalStatus(args.proposalid, args.amount);
            
            const budget = new Budget({
                ...args,
                ipfs: ipfsResponse ? ipfsResponse : `Failed to upload to IPFS at ${new Date().toISOString()}`,
            });
            return await budget.save();
        } catch (error) {
            throw new UserInputError("BudgetErrors : Unable to save to database, Please ensure value and try again!", errors)
        }
        
    },
};


module.exports = {
    submitBudget
}