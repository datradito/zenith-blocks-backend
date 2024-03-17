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
      budgetid
      status
      transactionHash
    }
  }
`;

export const GET_INVOICE_BY_ID = gql`
  query GetInvoiceById($id: String!) {
    getInvoiceById(id: $id) {
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
      budgetid
      status
      transactionHash
    }
  }
`;
