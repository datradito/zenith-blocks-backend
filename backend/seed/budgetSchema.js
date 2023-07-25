// const BudgetType = new GraphQLObjectType({
//     name: 'Budget',
//     fields: () => ({
//         Id: { type: GraphQLString },
//         Category: { type: GraphQLString },
//         Amount: { type: GraphQLFloat },
//         Currency: { type: GraphQLFloat },
//         Breakdown: { type: GraphQLString },
//         Proposal: { type: GraphQLString },
//         rootPath: { type: GraphQLString },
//         Invoices: {
//             type: new GraphQLList(InvoiceType),
//             resolve(parent, args) {
//                 return Invoice.find({ budgetId: parent.id })
//             }
//         },
//     })
// });

//here create sql table for budget
export const createBudgetTableSQL = `CREATE TABLE budget (
  id VARCHAR(255) PRIMARY KEY,
  category VARCHAR(255) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(255) NOT NULL,
  breakdown VARCHAR(255) NOT NULL,
  proposalId VARCHAR(255) NOT NULL,
  rootPath VARCHAR(255) NOT NULL,
  ipfsHash VARCHAR(255) NOT NULL
)`;
