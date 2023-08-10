const { GraphQLList, GraphQLString } = require('graphql');
const ProposalType = require('./typeDefs');
const Proposal = require('../../Database/models/Proposal');

const getProposalDetailsById = {
    type: ProposalType,
    args: { id: { type: GraphQLString } },
    resolve(parent, args) {
        return Proposal.findByPk(args.id)
    }
}

const getProposalsByDao = {
    type: new GraphQLList(ProposalType),
    args: { daoid: { type: GraphQLString } },
    resolve(parent, args) {
        return Proposal.find({ daoid: args.daoid })
    }
}

module.exports = {
    getProposalDetailsById,
    getProposalsByDao,
}