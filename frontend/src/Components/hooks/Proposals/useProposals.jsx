import { useState, useEffect, useCallback, useMemo } from "react";
import { GET_PROPOSAL_BY_SPACE } from "../../../SnapShot/Queries.js";
import { snapShotClient } from "../../../apolloConfig/client.js";
import { useQuery } from "@apollo/client";
import { message } from "antd";
import CircularIndeterminate from "../../atoms/Loader/loader.jsx";

const useProposals = () => {
  const dao = sessionStorage.getItem("daoId");
  const [currentPage, setCurrentPage] = useState(
    parseInt(localStorage.getItem("currentPage")) || 1
  );
  const [proposals, setProposals] = useState(null);
  const [syncedAt, setSyncedAt] = useState(null);
  const [title, setTitle] = useState("");

  const { loading, refetch, error } = useQuery(GET_PROPOSAL_BY_SPACE, {
    client: snapShotClient,
    variables: {
      first: 10,
      skip: (currentPage - 1) * 10,
      name: dao,
      title: title,
    },
    onCompleted: (data) => {
      setProposals(data.proposals);
      setSyncedAt(new Date().toLocaleString());
    },
    onError: (err) => {
      message.error({ content: "Error fetching proposals", key: "error" });
    },
  });

  const handleSkipValueChange = useCallback(() => {
    setCurrentPage((prevPage) => prevPage + 1);
  }, []);

  const handleSearch = useMemo(() => {
    return (searchTerm) => {
      setTitle(searchTerm);
      refetch();
    };
  }, [refetch]);

  const handleSyncProposals = useCallback(() => {
    setTitle("");
    refetch();
  }, [refetch]);

  if (error) {
    message.error({ content: "Error fetching proposals", key: "error" });
    return;
  }

  //use message api from antd to show loading state
  if (loading) {
    return { loading: true };
  } else {
    return {
      syncedAt,
      proposals,
      loading,
      handleSyncProposals,
      handleSkipValueChange,
      handleSearch,
    };
  }
};

export default useProposals;
