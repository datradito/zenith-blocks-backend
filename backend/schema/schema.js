const graphql = require('graphql');
const budgetMutations = require('../graphQL/budgets/mutations.js');
const budgetQueries = require('../graphQL/budgets/query.js');
const invoiceMutations = require('../graphQL/invoices/mutations.js');
const invoiceQueries = require('../graphQL/invoices/query.js');
const proposalMutations = require('../graphQL/proposals/mutations.js');
const proposalQueries = require('../graphQL/proposals/query.js');

const {
    GraphQLObjectType,
} = graphql;

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        ...budgetQueries,
        ...invoiceQueries,
        ...proposalQueries,
    })
});

//Todo: update date and currency filed to correct type in this file and validate  also in front end in serverQueries file

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        ...budgetMutations,
        ...invoiceMutations,
        ...proposalMutations,
    }),
})

module.exports = new graphql.GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
    context: (req) => ({ req })
})