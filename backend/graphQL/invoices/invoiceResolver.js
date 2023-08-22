const { GraphQLError } = require('graphql');
const Invoice = require('../../Database/models/Invoice');
const Budget = require('../../Database/models/Budget');
const { validateInvoice } = require('../../validators/validateInvoice');

const invoiceResolver = {
    Query: {
        getInvoicesByBudget: async (parent, args, context) => {
            try {
                return await Invoice.findAll({
                    where: { budgetid: args.budgetid }
                }, {
                    sort: {
                        createdAt: 'desc'
                    },
                })
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        },
        getInvoiceById: async (parent, args, context) => {
            try {
                return await Invoice.findByPk(args.id)
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        }
    },
    Mutation: {
        submitInvoice: async (parent, { invoice }, context) => {

            // const invoicedAmount = Invoice.findAll({
            //     where: {
            //         budgetid: invoice.budgetid
            //     }
            // }).then((invoices) => {
            //     let totalAmount = 0;
            //     invoices.forEach((invoice) => {
            //         totalAmount += invoice.total;
            //     });
            //     console.log("Total Amount: ", totalAmount);
            // });

            //ensure to check amount against all invoices for budget
            const budgetAmount = await Budget.findByPk(invoice.budgetid, {
                attributes: ['amount']
            })

            console.log("Budget Amount: ", budgetAmount.get('amount') );
            console.log("Invoice Amount: ", invoice.total);

            if (invoice.total > budgetAmount.get('amount')) {
                throw new GraphQLError('Invoice amount can not exceed total budget Amount', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        argumentName: 'total',
                    },
                })
            } else {
                const newInvoice = new Invoice({
                    ...invoice,
                    ipfs: "ipfsResponse",
                });

                try {
                    const savedInvoice = await newInvoice.save();
                    return savedInvoice;
                } catch (error) {
                    throw new GraphQLError(error.message);
                }
            }
        }
    }
}

module.exports = invoiceResolver;