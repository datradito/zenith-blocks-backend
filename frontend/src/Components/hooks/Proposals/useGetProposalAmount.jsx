import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_PROPOSAL_DETAILS } from "../../../model/proposals/query";
import { message } from "antd";

const useGetProposalAmount = (proposalid) => {
  const [amount, setAmount] = useState(null);
  const [status, setStatus] = useState(null);
  const [currency, setCurrency] = useState(null);

  const {
    loading: proposalLoading,
    error: proposalError,
    data: proposalAmountData,
    refetch,
    networkStatus,
  } = useQuery(GET_PROPOSAL_DETAILS, {
    variables: { proposalid },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (proposalAmountData) {
      setAmount(proposalAmountData.getProposalDetailsById?.amount || null);
      setStatus(proposalAmountData.getProposalDetailsById?.status || null);
      setCurrency(proposalAmountData.getProposalDetailsById?.currency || null);
    }
  }, [proposalAmountData, refetch]);

  useEffect(() => {
    if (proposalError) {
      message.error("Error fetching proposal amount");
    }
  }, [proposalError]);

  return {
    amount,
    status,
    currency,
    proposalLoading,
    proposalid,
    refetch,
    networkStatus,
  };
};

export default useGetProposalAmount;
