import { gql } from "@apollo/client";

export const ADD_OR_UPDATE_PROPOSAL = gql`
  mutation SetProposalAmount($proposalAmountInput: ProposalAmountInput) {
    setProposalAmount(proposal: $proposalAmountInput) {
      id
      amount
      currency
    }
  }
`;
