import { useState, useMemo } from "react";
import { GET_PROPOSAL_BY_SPACE } from "../../../model/proposals/query.js";
import { snapShotClient } from "../../../config/apolloConfig/client.js";
import { useQuery } from "@apollo/client";
import { message } from "antd";
import useAuthStore from "../../../store/modules/auth/index.ts";

const useProposals = () => {
  const { daoId } = useAuthStore((state) => state.user);
  const [currentPage, setCurrentPage] = useState(1);
  const [proposals, setProposals] = useState([]);
  const [syncedAt, setSyncedAt] = useState(null);
  const [title, setTitle] = useState("");
  const perPage = 5;

  const { loading, refetch, error } = useQuery(GET_PROPOSAL_BY_SPACE, {
    client: snapShotClient,
    variables: {
      skip: (currentPage - 1) * 10,
      name: daoId,
      title: title,
    },
    onCompleted: (data) => {
      setProposals(data.proposals || []);
      setSyncedAt(new Date().toLocaleString());
    },
    onError: (err) => {
      message.error({ content: "Error fetching proposals", key: "error" });
    },
  });

  const paginatedProposals = useMemo(() => {
    if (!proposals) return [];
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    return proposals.slice(start, end);
  }, [currentPage, proposals]);

  const handleSearch = (searchTerm) => {
    setTitle(searchTerm);
    refetch();
  };

  const handleSyncProposals = () => {
    setTitle("");
    refetch();
  };

  if (error) {
    message.error({ content: "Error fetching proposals", key: "error" });
  }

  return {
    syncedAt,
    count: proposals ? proposals.length : 0,
    paginatedProposals,
    loading,
    handleSyncProposals,
    handleSearch,
    currentPage,
    setCurrentPage,
  };
};

export default useProposals;
