import { gql } from "@apollo/client";

export const SUBMIT_PAYMENT = gql`
  mutation SubmitPayment($payment: PaymentInput) {
    submitPayment(payment: $payment) {
      recipient
      invoiceid
      proposalid
      currency
      total
      paid
      status
      transactionhash
      budgetid
    }
  }
`;

        // recipient: String!
        // invoiceid: String!
        // proposalid: String
        // currency: String!
        // total: Float!
        // paid: Float!
        // status: String!
        // transactionHash: String
        // budgetid: String!
