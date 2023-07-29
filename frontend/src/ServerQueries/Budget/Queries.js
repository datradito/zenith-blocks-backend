import { gql } from "@apollo/client";

export const GET_ALL_BUDGETS_FOR_PROPOSAL = gql`
  query GetAllBudgetsForProposal($proposalid: String!) {
    getBudgetsForProposal(proposalid: $proposalid) {
        category,
        amount,
        currency,
        breakdown,
        id,
    }
  }
`;

