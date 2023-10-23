import { useQuery } from "@tanstack/react-query";
import { client } from "../../../apolloConfig/client";
import { GET_REMAINING_PROPOSAL_AMOUNT } from "../../../ServerQueries/Proposals/Queries";

const useGetRemainingProposalAmount = (proposalId) => {
    const { data, isLoading, error } = useQuery(
        ["proposalAmounts", proposalId],
        async () => {
            const res = await client.query({
                query: GET_REMAINING_PROPOSAL_AMOUNT,
                variables: { id: proposalId },
            });

            console.log(res.data);
            return res.data;
        }
    );
    
    return {
        data,
        isLoading,
        error,
    };
};

export default useGetRemainingProposalAmount;