const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    //use it when you are dealing with more than one item meeting filter
    GraphQLList,
    GraphQLFloat,
} = require('graphql');

const BudgetType = require('../budgets/typeDefs');

const ProposalType = new GraphQLObjectType({
    name: 'Proposal',
    fields: () => ({
        id: { type: GraphQLString },
        amount: { type: GraphQLFloat },
        modified: { type: GraphQLString },
        status: { type: GraphQLString },
        modifier: { type: GraphQLString },
        rootpath: { type: GraphQLString },
        daoid: { type: GraphQLString },
        budgets: {
            type: new GraphQLList(BudgetType),
            resolve(parent, args) {
                return Budget.find({ proposalId: parent.id })
            }
        },
    }),
});

module.exports = ProposalType;
