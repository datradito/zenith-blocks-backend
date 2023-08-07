const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLFloat, GraphQLNonNull, GraphQLScalarType, Kind } = require('graphql');

const ProposalType = require('./typeDefs');
const Proposal = require('../../Database/models/Proposal');

const setProposalAmount = {
    type: ProposalType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        amount: { type: new GraphQLNonNull(GraphQLFloat) },
        modifier: { type: new GraphQLNonNull(GraphQLString) },
        rootpath: { type: new GraphQLNonNull(GraphQLString) },
        daoid: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent, args) => {
        
        //do some validations here to avoid overwriting amount once its written
        //check if proposal exists
        //check if proposal has amount

        //save proposal to ipfs with jsonData id,amountand daoId
        const jsonData = {
            "id": args.id,
            "amount": args.amount,
            "modifier": args.modifier,
            "daoid": args.daoid
        };

        let ipfsResponse;

        let ipfsFilePath = args.rootpath + 'proposalId' + jsonData.id;
        // try {
        //     const response = await UploadDataToIpfs(ipfsFilePath, jsonData);
        //     ipfsResponse = response.jsonResponse[0].path;
        // } catch (error) {
        //     console.error("Error uploading to IPFS:", error);
        // }

        let proposal = new Proposal({
            id: args.id,
            amount: args.amount,
            modifier: args.modifier,
            rootpath: args.rootpath,
            ipfs: "dummy ipfs",
            daoid: args.daoid,
        });
        return proposal.save();
    }
}

module.exports = {
    setProposalAmount
}
