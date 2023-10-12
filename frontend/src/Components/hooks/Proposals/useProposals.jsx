import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { GET_PROPOSAL_BY_SPACE } from "../../../SnapShot/Queries.js";
import { snapShotClient } from "../../../SnapShot/client.js";

const fetchProposalData = async (dao, currentPage) => {
  const response = await snapShotClient.query({
    query: GET_PROPOSAL_BY_SPACE,
    variables: {
      first: 10,
      skip: (currentPage - 1) * 10,
      name: dao,
    },
  });
  return response.data;
};

const useProposals = () => {
  const dao = sessionStorage.getItem("daoId");
  const [currentPage, setCurrentPage] = useState(
    parseInt(localStorage.getItem("currentPage")) || 1
  );

  const { data, error, isLoading, refetch, networkStatus } = useQuery(
    ["proposals", dao, currentPage],
    () => fetchProposalData(dao, currentPage),
    {
      notifyOnChangeProps: ["data", "error"],
    }
  );

  const handleSkipValueChange = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleSyncProposals = () => {
    refetch();
  };

  let syncedAt = new Date().toLocaleString();
  return {
    loading: isLoading,
    error,
    syncedAt,
    data,
    handleSyncProposals,
    handleSkipValueChange,
    networkStatus,
  };
};

export default useProposals;
