import { gql } from "@apollo/client";

export const GET_ALL_BUDGETS_FOR_PROPOSAL = gql`
  query GetAllBudgetsForProposal($proposalid: String!) {
    getBudgetsForProposal(proposalid: $proposalid) {
      id
      category
      amount
      currency
      breakdown
      remaining
      proposalid
    }
  }
`;

export const GET_BUDGET_BY_ID = gql`
  query GetBudgetById($id: String!) {
    getBudgetById(id: $id) {
        category,
        amount,
        currency,
        breakdown,
        id,
    }
  }
`;

export const GET_REMAINING_BUDGET_AMOUNT = gql`
  query GetRemainingBudgetAmount($budgetid: String!) {
    getRemainingBudgetAmount(budgetid: $budgetid) {
      amount
    }
  }
`;