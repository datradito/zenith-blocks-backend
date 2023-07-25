// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// // const BudgetType = new GraphQLObjectType({
// //     name: 'Budget',
// //     fields: () => ({
// //         Id: { type: GraphQLString },
// //         Category: { type: GraphQLString },
// //         Amount: { type: GraphQLFloat },
// //         Currency: { type: GraphQLFloat },
// //         Breakdown: { type: GraphQLString },
// //         Proposal: { type: GraphQLString },
// //         rootPath: { type: GraphQLString },
// //         Invoices: {
// //             type: new GraphQLList(InvoiceType),
// //             resolve(parent, args) {
// //                 return Invoice.find({ budgetId: parent.id })
// //             }
// //         },
// //     })
// // });

// const BudgetSchema = new Schema({
//     id: {
//         type: String,
//         required: true
//     },
//     category: {
//         type: String,
//         required: true
//     },
//     amount: {
//         type: Number,
//         required: true
//     },
//     currency: {
//         type: Number,
//         required: true
//     },
//     breakdown: {
//         type: String,
//         default: ""
//     },
//     proposal: {
//         type: String,
//         required: true
//     },
//     rootPath: {
//         type: String,
//         required: true
//     },
//     ipfsHash: {
//         type: String,
//         required: true
//     },
// });

// module.exports = mongoose.model('Budget', BudgetSchema);