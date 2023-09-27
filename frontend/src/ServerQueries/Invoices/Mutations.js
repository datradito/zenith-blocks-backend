import { gql } from "@apollo/client";

export const SUBMIT_INVOICE_MUTATION = gql`
  mutation SubmitInvoice(
    $invoice: InvoiceInput
  ) {
    submitInvoice(
      invoice: $invoice
    ){
      category
      recipient
      number
      currency
      total
      date
      duedate
      uploadinvoice
      description
      budgetid
    }
  }
`;