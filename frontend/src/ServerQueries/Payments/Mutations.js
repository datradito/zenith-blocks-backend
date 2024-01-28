import { gql } from "@apollo/client";

// export const SUBMIT_PAYMENT = gql`
//   mutation SubmitPayment($payment: PaymentInput) {
//     submitPayment(payment: $payment) {
//         invoiceid 
//         currency 
//         total 
//         status 
//         transactionhash
//         budgetid 
//     }
//   }
// `;

const paymentFragment = gql`
  fragment PaymentFields on Payment {
    invoiceid
    currency
    total
    status
    transactionhash
    budgetid
  }
`;


export const SUBMIT_PAYMENT = gql`
  mutation SubmitPayment($paymentInput: PaymentInput!) {
    submitPayment(payment: $paymentInput) {
      ...PaymentFields
    }
  }
  ${paymentFragment}
`;