import { GraphQLError } from "graphql";
import { Sequelize } from "sequelize";
import axios from "axios";
import Invoice from "../../Database/models/Invoice.js";
import Budget from "../../Database/models/Budget.js";
import {
  validateInvoice,
  validateInvoiceAmount,
} from "../../validators/validateInvoice.js";

import {
  throwCustomError,
  ErrorTypes,
} from "../../errors/errorHandlerHelper.js";
import { BillStatuses } from "../../utility/constants/BillStatuses.js";

const invoiceResolver = {
  Query: {
    getInvoices: async (parent, args, context) => {
      try {
        let invoices;

        if (args && Object.keys(args).length > 0) {
          invoices = await Invoice.findAll(
            {
              where: { ...args.filter },
            },
            {
              sort: {
                createdAt: "desc",
              },
            }
          );
        } else {
          invoices = await Invoice.findAll({
            sort: {
              createdAt: "desc",
            },
          });
        }

        //here call the transaction service and append readyToExecute flag to it.
        // const safe = safeService.getTransaction(transasctionHash)
        // const readyToExecute = safeService.isTxExecutable(transasctionHash)
        //invoices = invoices.map(async (invoice) => {
        //  return {
        //    ...invoice,
        //    readyToExecute: readyToExecute
        //  }

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
      const newInvoice = new Invoice({
        ...invoice,
      });

      try {
        const savedInvoice = await newInvoice.save();
        return savedInvoice;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    deleteBills: async (parent, { billIds }, context) => {
      console.log(billIds);
      try {
        const deletedBills = await Invoice.findAll({
          where: {
            id: {
              [Sequelize.Op.in]: billIds,
            },
            transactionHash: null,
          },
        });

        if (deletedBills.length > 0) {
          await Invoice.destroy({
            where: {
              id: {
                [Sequelize.Op.in]: billIds,
              },
              transactionHash: null,
            },
          });
        }

        return deletedBills.map((bill) => bill.id);
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    duplicateInvoice: async (parent, { id: invoiceId }, context) => {
      const invoice = await Invoice.findByPk(invoiceId);
      const { budgetId, id, ...rest } = invoice.dataValues;

      const { errors, valid } = await validateInvoiceAmount(
        budgetId,
        invoice.total
      );

      if (!valid) {
        throwCustomError(
          errors.total || errors.budget,
          ErrorTypes.BAD_USER_INPUT
        );
      } else {
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
    },
    //TODO: Change to update invoice status???
    updateBillStatus: async (parent, { id, status }, context) => {
      try {
        const invoice = await Invoice.findByPk(id);
        if (!invoice) {
          throw new Error(`No invoice found with id: ${id}`);
        }

        const newStatus = BillStatuses[status.toUpperCase()];

        if (!newStatus) {
          throw new Error(`Invalid status: ${status}`);
        }
        invoice.status = newStatus;
        await invoice.save();
        return invoice;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
};

export default invoiceResolver;
