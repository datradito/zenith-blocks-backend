import { gql } from "@apollo/client";

export const GET_ALL_INVOICES_BY_BUDGET = gql`
  query GetAllInvoicesByBudget($budgetid: String!, $where: InvoiceFilterInput) {
    getInvoicesByBudget(
      budgetid: $budgetid
      # order: { date: DESC }
      where: $where
    ) {
      id
      category
      recipient
      owneraddress
      number
      currency
      total
      date
      duedate
      uploadinvoice
      description
      budgetid
      status
    }
  }
`;


export const GET_INVOICE_BY_ID = gql`
  query GetInvoiceById($id: String!) {
    getInvoiceById(id: $id) {
      category
      recipient
      owneraddress
      number
      currency
      total
      date
      duedate
      uploadinvoice
      description
      budgetid
      status
    }
  }
`;
