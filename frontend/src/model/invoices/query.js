import { gql } from "@apollo/client";

export const GET_ALL_INVOICES = gql`
  query GetAllInvoices($filter: InvoiceFilterInput) {
    getInvoices(filter: $filter) {
      id
      category
      recipient
      owneraddress
      number
      currency
      total
      date
      duedate
      description
      status
      transactionHash
    }
  }
`;

