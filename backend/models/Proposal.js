// //create proposalSchema based on schema declared in schema.js
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const BudgetSchema = require('./Budget').schema;

// const proposalSchema = new Schema({
//     id: {
//         type: String,
//         required: true
//     },
//     title: {
//         type: String,
//         required: true
//     },
//     body: {
//         type: String,
//         default: ""
//     },
//     amount: {
//         type: Number,
//         required: true
//     },
//     currency: {
//         type: Number,
//         required: true
//     },
//     modified: {
//         type: String,
//         required: true
//     },
//     status: {
//         type: String,
//         required: true
//     },
//     modifier: {
//         type: String,
//         required: true
//     },
//     rootPath: {
//         type: String,
//         required: true
//     },
//     budgets: {
//         type: [BudgetSchema],
//         required: true
//     },
//     ipfsHash: {
//         type: String,
//         required: true
//     },

// });

// module.exports = mongoose.model('Proposal', proposalSchema);



