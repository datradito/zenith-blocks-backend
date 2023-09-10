import { gql } from '@apollo/client';

export const GET_ALL_INVOICES_BY_BUDGET = gql`
    query GetAllInvoicesByBudget($budgetid: String!) {
        getInvoicesByBudget(budgetid: $budgetid) {
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