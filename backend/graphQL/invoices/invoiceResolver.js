const { GraphQLError } = require('graphql');
const Invoice = require('../../Database/models/Invoice');
const Budget = require('../../Database/models/Budget');
const { validateInvoice } = require('../../validators/validateInvoice');

const invoiceResolver = {
    Query: {
        getInvoicesByBudget: async (parent, args, context) => {
            try {
                Invoice.findAll({
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
                Invoice.findByPk(args.id)
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        }
    },
    Mutation: {
        submitInvoice: async (parent, args, context) => {

            const invoicedAmount = Invoice.findAll({
                where: {
                    budgetid: args.budgetid
                }
            }).then((invoices) => {
                let totalAmount = 0;
                invoices.forEach((invoice) => {
                    totalAmount += invoice.total;
                });
                console.log("Total Amount: ", totalAmount);
            });

            const budgetAmount = Budget.findByPk(args.budgetid, {
                attributes: ['amount']
            })

            if (!(args.total + invoicedAmount < budgetAmount)) {
                throw new GraphQLError('Invoice amount can not exceed total budget Amount', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        argumentName: 'total',
                    },
                })
            } else {
                const invoice = new Invoice({
                    ...args,
                    ipfs: "ipfsResponse",
                });
                try {
                    const savedInvoice = await invoice.save();
                    return savedInvoice;
                } catch (error) {
                    throw new GraphQLError(error.message);
                }
            }
        }
    }
}

module.exports = invoiceResolver;