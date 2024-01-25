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

export const GET_SPACES = gql`
  query Spaces {
    spaces {
      name,
      id
    }
}`


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

export const GET_PROPOSAL_BY_SPACE = gql`
    query GetProposals($name: String, $first: Int, $skip: Int, $title: String) {
        proposals(where: { space: $name, title_contains: $title }, first: $first, skip: $skip) 
         {
          id
          title
          body
          choices
          start
          end
          snapshot
          state
          author
          space {
            id
            name
          }
        }
      }
`;



