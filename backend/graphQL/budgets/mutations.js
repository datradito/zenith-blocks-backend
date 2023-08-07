const BudgetType = require('./typeDefs');
const { GraphQLNonNull, GraphQLString, GraphQLFloat } = require('graphql');
const validateBudget = require('../../validators/validateBudget');
const Budget = require("../../Database/models/Budget")

const { AuthenticationError, UserInputError } = require('apollo-server')

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
        // else {
        //     //TODO: step 1: save invoice to ipfs
        //     const jsonData = {
        //         "category": args.category,
        //         "amount": args.amount,
        //         "currency": args.currency,
        //         "breakdown": args.breakdown,
        //         "proposalid": args.proposalid,
        //     };
            
        //     let ipfsResponse
        //     let ipfsFilePath = args.rootpath + 'budgetId' + jsonData.id;
        //     try {
        //         const response = await UploadDataToIpfs(ipfsFilePath, jsonData);
        //          ipfsResponse = response.jsonResponse[0].path;
        //     } catch (error) {
        //         console.error("Error uploading to IPFS:", error);
        //     }

        //     //Todo: step 2: save ipfs hash + invoice data to mongo db
        //     //send ipfs hash to mysql d
        //     const budget = new Budget({
        //         ...jsonData,
        //         ipfsResponse: "ipfsResponse"
        //     });
        //     return await budget.save();
        // }
        const budget = new Budget({
            ...args,
            ipfs: "ipfsResponse"
        });

        console.log("comes to here")
        return await budget.save();
    },
};


module.exports = {
    submitBudget
}