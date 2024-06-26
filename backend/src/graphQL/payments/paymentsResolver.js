import { GraphQLError } from "graphql";
import Invoice from "../../Database/models/Invoice.js";
import Payment from "../../Database/models/Payment.js";
import { BillStatuses } from "../../utility/constants/BillStatuses.js";

const paymentsResolver = {
  Query: {
    getAllPayments: async () => {
      const payments = await Payment.findAll();
      return payments;
    },
    getPaymentByInvoiceId: async (_, args) => {
      const { invoiceid } = args;
      const payment = await Payment.findOne({ where: { invoiceid } });
      return payment;
    },
  },
  Mutation: {
    submitPayment: async (_, args) => {
      const { payment } = args;

      try {
        // Check if the invoice has already been paid
        const invoice = await Invoice.findOne({
          where: { invoiceid: payment.invoiceid },
        });

        if (invoice.status === BillStatuses.PAID) {
          throw new GraphQLError("Invoice has already been paid", {
            extensions: {
              code: "BAD_USER_INPUT",
              argumentName: "invoiceid",
            },
          });
        }

        // Create a new payment and save it
        const newPayment = await Payment.create({
          ...payment,
          ipfs: "ipfsResponse", // Replace with actual ipfs response
        });

        //get all payments for invoice and check against invoice total and payment total
        const invoicePayments = await Payment.findAll({
          where: { invoiceid: payment.invoiceid },
        });

        let totalPaid = 0;
        invoicePayments.forEach((payment) => {
          totalPaid += payment.total;
        });

        // If the total paid is greater than the invoice total, throw an error
        if (totalPaid > parseInt(invoice.total)) {
          throw new GraphQLError("Payment total exceeds invoice total", {
            extensions: {
              code: "BAD_USER_INPUT",
              argumentName: "invoiceid",
            },
          });
        }

        // If the total paid is less than the invoice total, and new payment is for either less or equal to remaining invoice amount then create payment
        if (parseInt(invoice.total - totalPaid) === parseInt(payment.total)) {
          await Invoice.update(
            {
              status: BillStatuses.PAID,
            },
            { where: { id: payment.invoiceid } }
          );
        }

        // Update the invoice's remaining amount and set status to paid
        if (parseInt(invoice.total - totalPaid) > parseInt(payment.total)) {
          await Invoice.update(
            {
              status: BillStatuses.PARTIALPAID,
            },
            { where: { id: payment.invoiceid } }
          );
        }

        return newPayment;
      } catch (error) {
        throw new GraphQLError("An error occurred while submitting payment", {
          extensions: {
            code: "INTERNAL_SERVER_ERROR",
          },
        });
      }
    },
  },
};

export default paymentsResolver;
