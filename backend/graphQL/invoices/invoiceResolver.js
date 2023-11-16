const { GraphQLError } = require('graphql');
const Invoice = require('../../Database/models/Invoice');
const Budget = require('../../Database/models/Budget');
const { validateInvoice, validateInvoiceAmount } = require('../../validators/validateInvoice');

const {
  throwCustomError,
  ErrorTypes,
} = require("../../utility//errorHandlerHelpers/errorHandlerHelper");

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

            // const { valid, errors } = validateInvoice(
            //     invoice);
            
            // if (!valid) {
            //     throw new GraphQLError(errors);
            // }

            const { errors, valid } = await validateInvoiceAmount(invoice.budgetid, invoice.total);

                  if (!valid) {
                    throwCustomError(errors.total || errors.budget, ErrorTypes.BAD_USER_INPUT);
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
        },
        duplicateInvoice: async (parent, { id: invoiceId }, context) => {
            const invoice = await Invoice.findByPk(invoiceId);
            const { budgetId ,id, ...rest} = invoice.dataValues;
            const newInvoice = new Invoice({
                ...rest,
                date: new Date().getTime() + 1000 * 60 * 60 * 24 * 30,
                duedate: new Date().getTime() + 1000 * 60 * 60 * 24 * 60,
                number: invoice.number + 1,
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

module.exports = invoiceResolver;