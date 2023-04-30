import { gql } from '@apollo/client';


export const GET_PROPOSAL = gql`
    query GetProposalsBySpace($space: String!) {
      proposals( where: {
        space: $space
      }){
        id,
        title
      }
    }
`;

export const GET_All_PROPOSALS = gql`
    query GetProposals($first: Int, $skip: Int) {
      proposals(first: $first, skip: $skip) {
        id,
        title,
        space {
          name
        },
      }
    }
`;

export const GET_PROPOSAL_BY_ID = gql`
    query GetProposals($id: String) {
      proposal(id: $id) {
      id,
      title,
      body,
      state,
      votes,
      symbol,
      discussion,
      created,
      ipfs,
      space {
        name
      },
      }
    }
`;



