import { GraphQLError } from "graphql";
import Invoice from "../../Database/models/Invoice.js";
import Budget from "../../Database/models/Budget.js";
import {
    validateInvoice,
    validateInvoiceAmount,
} from "../../validators/validateInvoice.js";
    
// const {
//   throwCustomError,
//   ErrorTypes,
// } = require("../../utility//errorHandlerHelpers/errorHandlerHelper");

import {
    throwCustomError,
    ErrorTypes,
} from "../../utility/errorHandlerHelpers/errorHandlerHelper.js";

const invoiceResolver = {
  Query: {
    getInvoicesByBudget: async (parent, args, context) => {
      const { budgetid, where } = args;
      try {
              let invoices;

              if (where && Object.keys(where).length > 0) {
                // Filter based on 'where' conditions if provided
                invoices = await Invoice.findAll(
                  {
                    where: { budgetid , ...where },
                  },
                  {
                    sort: {
                      createdAt: "desc",
                    },
                  }
                );
              } else {
                // If 'where' conditions are not provided, fetch without any filter
                invoices = await Invoice.findAll(
                  {
                    where: { budgetid },
                  },
                  {
                    sort: {
                      createdAt: "desc",
                    },
                  }
                );
              }
        return invoices;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    getInvoiceById: async (parent, args, context) => {
      try {
        return await Invoice.findByPk(args.id);
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
  Mutation: {
    submitInvoice: async (parent, { invoice }, context) => {
      const { valid: validInvoice, errors: errorsInvoice } = validateInvoice(
          invoice);

      if (!validInvoice) {
          throw new GraphQLError(errorsInvoice);
      }

      const { errors, valid } = await validateInvoiceAmount(
        invoice.budgetid,
        invoice.total
      );

      if (!valid) {
        throwCustomError(
          errors.total || errors.budget,
          ErrorTypes.BAD_USER_INPUT
        );
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
      const { budgetId, id, ...rest } = invoice.dataValues;
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
    },
  },
};

export default invoiceResolver;
