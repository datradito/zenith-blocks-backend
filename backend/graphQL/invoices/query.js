// const InvoiceType = require('./typeDefs');
// const Invoice = require('../../Database/models/Invoice');
// const { GraphQLString, GraphQLList } = require('graphql');

// const getInvoicesByBudget = {
//     type: new GraphQLList(InvoiceType),
//     args: { budgetid: { type: GraphQLString } },
//     resolve(parent, args) {
//         return Invoice.findAll({
//             where: { budgetid: args.budgetid }
//         }, {
//             sort: {
//                 createdAt: 'desc'
//             },
//         })
//     }
// }

// const getInvoiceById = {
//     type: InvoiceType,
//     args: { id: { type: GraphQLString } },
//     resolve(parent, args) {
//         return Invoice.findByPk(args.id)
//     }
// }

// module.exports = {
//     getInvoicesByBudget,
//     getInvoiceById,
// }