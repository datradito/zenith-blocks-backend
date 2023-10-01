import { gql } from "@apollo/client";

export const GET_TOKEN_BALANCE = gql`
    query GetTokenBalance($address: String!) {
        getTokenBalances(address: $address) {
            name
            symbol
            balance
        }
    }
`;