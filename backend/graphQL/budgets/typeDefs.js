const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLFloat,
} = require('graphql');

const InvoiceType = require('../invoices/typeDefs');
const Invoice = require('../../Database/models/Invoice');

const BudgetType = new GraphQLObjectType({
    name: 'Budget',
    fields: () => ({
        id: { type: GraphQLString },
        category: { type: GraphQLString },
        amount: { type: GraphQLFloat },
        currency: { type: GraphQLString },
        breakdown: { type: GraphQLFloat },
        proposalid: { type: GraphQLString },
        rootpath: { type: GraphQLString },
        ipfs: { type: GraphQLString },
        invoices: {
            type: new GraphQLList(InvoiceType),
            resolve(parent, args) {
                return Invoice.find({ budgetid: parent.id })
            }
        },
    })
});

module.exports = BudgetType;