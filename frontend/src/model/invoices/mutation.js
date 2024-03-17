import { gql } from "@apollo/client";

export const SUBMIT_INVOICE_MUTATION = gql`
  mutation SubmitInvoice($invoice: InvoiceInput) {
    submitInvoice(invoice: $invoice) {
      category
      recipient
      number
      currency
      total
      date
      duedate
      description
      budgetid
      transactionHash
    }
  }
`;

export const DUPLICATE_INVOICE_MUTATION = gql`
  mutation DuplicateInvoice($id: String!) {
    duplicateInvoice(id: $id) {
      category
      recipient
      number
      currency
      total
      date
      duedate
      description
      budgetid
    }
  }
`;
