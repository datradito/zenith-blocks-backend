import { useQuery } from "@apollo/client";
import { GET_REMAINING_PROPOSAL_AMOUNT } from "../../../ServerQueries/Proposals/Queries";
import { toast } from "react-hot-toast";
import { useState } from "react";

const useGetRemainingProposalAmount = (proposalId) => {
    const [ remainingProposalAmount, setRemainingProposalAmount ] = useState(0);

    const { data, isLoading, error } = useQuery( GET_REMAINING_PROPOSAL_AMOUNT, {
        variables: { id: proposalId },
        onCompleted: () => {
            setRemainingProposalAmount(data?.getRemainingProposalAmount);
            toast.success("Proposal Amount fetched successfully");
        },
        onError: (errors) => {
            toast.error(errors.message);
        }
    });

    return {
        remainingProposalAmount,
        isLoading,
        error,
    };
};

export default useGetRemainingProposalAmount;