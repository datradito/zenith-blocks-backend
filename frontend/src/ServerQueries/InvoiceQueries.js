import { gql } from "@apollo/client";

const LineInput = gql`
  input LineInput {
    category: String!
    amount: Float!
    currency: Float!
    description: String!
  }
`;

export const SUBMIT_INVOICE_MUTATION = gql`
  mutation (
    $Category: String!
    $Recipient: String!
    $InvoiceNumber: String!
    $Currency: String!
    $InvoiceDate: String!
    $DueDate: String!
    $UploadInvoice: String!
    $Description: String!
    $BudgetId: String!
    $Lines: [InvoiceLine]
  ) {
    submitInvoice(
      category: $Category
      recipient: $Recipient
      number: $InvoiceNumber
      currency: $Currency
      date: $InvoiceDate
      duedate: $DueDate
      uploadinvoice: $UploadInvoice
      description: $Description
      budgetid: $BudgetId
      lines: $Lines
    ){
      category
      recipient
      number
      currency
      date
      duedate
      uploadinvoice
      description
      budgetid
    }
  }
`;