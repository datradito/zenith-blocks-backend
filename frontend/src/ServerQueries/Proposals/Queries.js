import { gql } from "@apollo/client";


export const GET_REMAINING_PROPOSAL_AMOUNT = gql`
    query GetRemainingProposalAmount($id: String!) {
        getRemainingProposalAmount(id: $id)
    }
`;