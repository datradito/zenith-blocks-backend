import { gql } from '@apollo/client';

export const ADD_OR_UPDATE_PROPOSAL = gql`
  mutation AddOrUpdateProposal(
    $Id: String!
    $Amount: Float!
    $Modifier: String!
    $RootPath: String!
    $DaoId: String!
  ) {
    addOrUpdateProposal(
      Id: $Id
      Amount: $Amount
      Modifier: $Modifier
      RootPath: $RootPath
      DaoId: $DaoId
    ) {
      Id
      Amount
    }
  }
`;

