import { gql } from '@apollo/client';

export const GET_ALL_INVOICES_BY_BUDGET = gql`
    query GetAllInvoicesByBudget($budgetid: String!) {
        getInvoicesByBudget(budgetid: $budgetid) {
            id,
            category,
            amount,
            currency,
            breakdown,
            budgetid,
        }
    }
`;