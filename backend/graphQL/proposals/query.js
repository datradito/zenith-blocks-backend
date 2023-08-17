// const { GraphQLList, GraphQLString } = require('graphql');
// const ProposalType = require('./typeDefs');
// const Proposal = require('../../Database/models/Proposal');

// const getProposalDetailsById = {
//     type: ProposalType,
//     args: { id: { type: GraphQLString } },
//     resolve(parent, args, context) {

//         return 

//         try {
//             const user = await Proposal.findByPk(args.id);
//             return user;
//         } catch (error) {
//             throw new GraphQLError(error.message);
//         }
//     }
// }



// const getProposalsByDao = {
//     type: new GraphQLList(ProposalType),
//     args: { daoid: { type: GraphQLString } },
//     resolve(parent, args, context) {
//         return Proposal.find({ daoid: args.daoid })
//     }
// }



// module.exports = {
//     getProposalDetailsById,
//     getProposalsByDao,
// }