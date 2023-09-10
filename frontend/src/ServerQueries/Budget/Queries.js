import { gql } from "@apollo/client";

export const GET_ALL_BUDGETS_FOR_PROPOSAL = gql`
  query GetAllBudgetsForProposal($proposalid: String!) {
    getBudgetsForProposal(proposalid: $proposalid) {
      id
      category
      amount
      currency
      breakdown
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

