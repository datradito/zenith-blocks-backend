import { gql } from "@apollo/client";

export const SUBMIT_BUDGET_MUTATION = gql`
  mutation SubmitBudget($budget: BudgetInput) {
    submitBudget(budget: $budget) {
      id
      category
      amount
      currency
      breakdown
      proposalid
    }
  }
`;
