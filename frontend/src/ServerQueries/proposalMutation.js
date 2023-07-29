import { gql } from '@apollo/client';

export const ADD_OR_UPDATE_PROPOSAL = gql`
  mutation SetProposalAmount(
    $id: String!
    $amount: Float!
    $modifier: String!
    $rootpath: String!
    $daoid: String!
  ) {
    setProposalAmount(
      id: $id
      amount: $amount
      modifier: $modifier
      rootpath: $rootpath
      daoid: $daoid
    ) {
      id
      amount
    }
  }
`;

