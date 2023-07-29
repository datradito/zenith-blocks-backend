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

// const GraphQLString = new GraphQLScalarType({
//     name: 'Date',
//     description: 'Date custom scalar type',
//     serialize(value) {
//         if (value instanceof Date) {
//             return value.getTime(); // Convert outgoing Date to integer for JSON
//         }
//         throw Error('GraphQL Date Scalar serializer expected a `Date` object');
//     },
//     parseValue(value) {
//         if (typeof value === 'number') {
//             return new Date(value); // Convert incoming integer to Date
//         }
//         throw new Error('GraphQL Date Scalar parser expected a `number`');
//     },
//     parseLiteral(ast) {
//         if (ast.kind === Kind.INT) {
//             // Convert hard-coded AST string to integer and then to Date
//             return new Date(parseInt(ast.value, 10));
//         }
//         // Invalid hard-coded value (not an integer)
//         return null;
//     },
// });


// const _ = require('lodash');
//You can also assing ID to graphQLID type from graphql, which allow us to pass string or number for Id, whereas now only string is allowd
//graphQLInt


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