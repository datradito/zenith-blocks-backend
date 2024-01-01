import { useQuery } from "@apollo/client";
import { GET_REMAINING_PROPOSAL_AMOUNT } from "../../../ServerQueries/Proposals/Queries";
import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";

const useGetRemainingProposalAmount = (proposalId) => {
  const [remainingProposalAmount, setRemainingProposalAmount] = useState(0);
  const { data, loading, error } = useQuery(GET_REMAINING_PROPOSAL_AMOUNT, {
    variables: { id: proposalId },
  });

  useEffect(() => {
    if (data?.getRemainingProposalAmount !== undefined) {
      setRemainingProposalAmount(data.getRemainingProposalAmount);
      toast.success("Proposal Amount fetched successfully");
    }
  }, [data]);

  if (loading) {
    return { loading: true, remainingProposalAmount: null, error: null };
  }

  if (error) {
    toast.error(error.message);
    return {
      loading: false,
      remainingProposalAmount: null,
      error: error.message,
    };
  }

  return {
    loading: false,
    remainingProposalAmount,
    error: null,
  };
};

export default useGetRemainingProposalAmount;
