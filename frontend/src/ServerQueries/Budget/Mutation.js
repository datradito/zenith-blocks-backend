import { gql } from "@apollo/client";

// Define the mutation query
export const SUBMIT_BUDGET_MUTATION = gql`
  mutation SubmitBudget(
    $category: String!
    $amount: Float!
    $currency: String!
    $breakdown: Float!
    $proposalid: String!
    $rootpath: String!
  ) {
    submitBudget(
      category: $category
      amount: $amount
      currency: $currency
      breakdown: $breakdown
      proposalid: $proposalid
      rootpath: $rootpath
    ) {
      id
      category
      amount
      currency
      breakdown
      proposalid
      rootpath
    }
  }
`;