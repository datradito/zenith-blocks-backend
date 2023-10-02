import { gql } from "@apollo/client";

export const GET_TOKEN_BALANCE = gql`
    query GetTokenBalance($address: String!) {
        getTokenBalances(address: $address) {
            name
            symbol
            balance
            logo
        }
    }
`;

export const GET_TRANSACTION_HISTORY = gql`
  query GetTransactionHistory($address: String!) {
    getTokenTransactionHistory(address: $address) {
      asset
      value
      from
      to
      blockNum
    }
  }
`;