import { useState, useContext, useEffect } from "react";
import { GET_PROPOSAL_BY_SPACE } from "../../../SnapShot/Queries.js";
import { snapShotClient } from "../../../apolloConfig/client.js";
import { UserContext } from "../../../Utility/Providers/UserProvider.jsx";

const useProposals = () => {
  const dao = sessionStorage.getItem("daoId");
  const [currentPage, setCurrentPage] = useState(
    parseInt(localStorage.getItem("currentPage")) || 1
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [networkStatus, setNetworkStatus] = useState(null);
  const [syncedAt, setSyncedAt] = useState(null);
  const [refetch, setRefetch] = useState(false);

  const user = useContext(UserContext);

  useEffect(() => {
    const fetchProposals = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await snapShotClient.query({
          query: GET_PROPOSAL_BY_SPACE,
          variables: {
            first: 10,
            skip: (currentPage - 1) * 10,
            name: dao,
          },
        });

        const { loading, networkStatus, data, error } = response;

        setData(data);
        setLoading(loading);
        setError(error);
        setNetworkStatus(networkStatus);

      } catch (err) {
        setError(err);
        setNetworkStatus(8);
      } finally {
        setLoading(false);
        setSyncedAt(new Date().toLocaleString());
      }
    };

    if (!user) {
      window.location.href = "/";
    } else {
      fetchProposals();
    }
  }, [dao, currentPage, user, refetch]);

  const handleSkipValueChange = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleSyncProposals = () => {
    setRefetch((prev) => !prev);
  };

  return {
    loading,
    error,
    syncedAt,
    data,
    handleSyncProposals,
    handleSkipValueChange,
    networkStatus,
  };
};

export default useProposals;
