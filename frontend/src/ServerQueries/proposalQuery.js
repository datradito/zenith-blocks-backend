import { gql } from '@apollo/client';

export const GET_PROPOSAL_DETAILS = gql`
  query GetProposalDetails($proposalId: String!) {
    getProposalAmountById(Id: $proposalId) {
      Id
      Amount
    }
  }
`;
