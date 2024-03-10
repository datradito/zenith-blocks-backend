import { gql } from "@apollo/client";

export const GET_PROPOSAL = gql`
  query GetProposalsBySpace($space: String!) {
    proposals(where: { space: $space }) {
      id
      title
    }
  }
`;

export const GET_PROPOSAL_BY_ID = gql`
  query GetProposals($id: String) {
    proposal(id: $id) {
      id
      title
      body
      state
      votes
      symbol
      discussion
      created
      ipfs
      space {
        name
      }
    }
  }
`;

export const GET_PROPOSAL_BY_SPACE = gql`
  query GetProposals($name: String, $first: Int, $skip: Int, $title: String) {
    proposals(
      where: { space: $name, title_contains: $title }
      first: $first
      skip: $skip
    ) {
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

export const GET_PROPOSAL_DETAILS = gql`
  query GetProposalDetails($proposalid: String!) {
    getProposalDetailsById(id: $proposalid) {
      amount
      status
      currency
    }
  }
`;

export const GET_REMAINING_PROPOSAL_AMOUNT = gql`
  query GetRemainingProposalAmount($id: String!) {
    getRemainingProposalAmount(id: $id)
  }
`;
