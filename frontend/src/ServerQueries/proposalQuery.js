import { gql } from '@apollo/client';

// export const GET_PROPOSAL_DETAILS = gql`
//   query GetProposalDetails($proposalid: String!) {
//     getProposalAmountById(id: $proposalid) {
//       id,
//       amount
//     }
//   }
// `;

export const GET_PROPOSAL_DETAILS = gql`
  query GetProposalDetails($proposalid: String!) {
    getProposalDetailsById(id: $proposalid) {
      amount,
      status
    }
  }
`;