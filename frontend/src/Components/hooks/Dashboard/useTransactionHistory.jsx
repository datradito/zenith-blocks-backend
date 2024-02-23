import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import getHistoricalTransactions from "../../../Services/DashboardServices/fetchHistoricalTransactions";
import CircularIndeterminate from "../../atoms/Loader/loader";
import { message } from "antd";
import { useCallback } from "react";
import usePolling from "../Safe/usePolling";
import SafeTransactionsService from "../../../Services/DashboardServices/safeTransactions";


const useTransactionHistory = (safeAddress, apiKit, maxCount = "0x3e8") => {

  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(false);
  const [count, setCount] = useState(0);

  const sanitizeTransactions = async (allTxs) => {
    const sanitizedTransactions = [];
    allTxs.forEach((tx) => {
      const transaction = new SafeTransactionsService(tx);
      sanitizedTransactions.push(transaction.sanitizeTransaction());
    });

    return sanitizedTransactions;
  };


  const safeTransactions = useCallback(async () => {
    // const allTxsOptions = {
    //   executed,
    //   queued,
    //   trusted,
    // };
    try {
      setLoading(true);
      let allTxs = await apiKit.getAllTransactions(
        safeAddress,
        0,
        100,
        true,
        true,
        true
      );
      allTxs = await sanitizeTransactions(allTxs.results);

      setCount(allTxs.length);
      setTransactions(allTxs);
      setLoading(false);
      return allTxs;
    } catch (error) {
      setError(true);
      setLoading(false);
      console.log("error", error);
      message.error("Error fetching transaction history");
    }
  }, [safeAddress, apiKit]);

  usePolling(safeTransactions);

  loading && <CircularIndeterminate />;
  return {
    transactions,
    loading,
    count,
    error,
  };
};

export default useTransactionHistory;
