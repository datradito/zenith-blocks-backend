import { useQuery } from "@apollo/client";
import { GET_REMAINING_PROPOSAL_AMOUNT } from "../../../model/proposals/query";
import { useState, useEffect } from "react";

//we should update amount on proposal in backend whenever there is a transaction against proposal so that
//we dont have to have another resolver jsut for amount, right now even backend has to manually gather proposal total - budgetsed amount
const useGetRemainingProposalAmount = (proposalId) => {
  const [remainingProposalAmount, setRemainingProposalAmount] = useState(0);
  const { data, loading, error } = useQuery(GET_REMAINING_PROPOSAL_AMOUNT, {
    variables: { id: proposalId },
  });

  useEffect(() => {
    if (data?.getRemainingProposalAmount !== undefined) {
      setRemainingProposalAmount(data.getRemainingProposalAmount);
    }
  }, [data]);

  if (loading) {
    return { loading: true, remainingProposalAmount: null, error: null };
  }

  if (error) {
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
