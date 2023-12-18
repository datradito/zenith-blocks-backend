import { GraphQLError } from "graphql";
import Invoice from "../../Database/models/Invoice.js";
import Budget from "../../Database/models/Budget.js";


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
          if (invoice.status === "paid") {
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

        // Update the invoice's remaining amount and set status to paid
        await Invoice.update(
          {
            status: "paid",
            remaining: parseInt(invoice.remaining) - parseInt(payment.total),
          },
          { where: { invoiceid: payment.invoiceid } }
        );

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
