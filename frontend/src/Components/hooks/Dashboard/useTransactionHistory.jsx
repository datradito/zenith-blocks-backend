import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import getHistoricalTransactions from "../../../Services/DashboardServices/fetchHistoricalTransactions";
import CircularIndeterminate from "../../atoms/Loader/loader";
import { message } from "antd";
import { useCallback } from "react";
import usePolling from "../Safe/usePolling";
import SafeTransactionsService from "../../../Services/DashboardServices/safeTransactions";

const useTransactionHistory = (safeAddress, apiKit, transactionType) => {
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(false);
  const [count, setCount] = useState(0);

  const sanitizeTransactions = useMemo(() => {
    return async (allTxs) => {
      const sanitizedTransactions = [];
      try {
        allTxs.forEach((tx) => {
          const transaction = new SafeTransactionsService(tx);
          sanitizedTransactions.push(transaction.sanitizeTransaction());
        });
      } catch (error) {
        console.error("Error sanitizing transactions", error);
        throw error;
      }

      return sanitizedTransactions;
    };
  }, [transactionType]);

  const safeTransactions = useCallback(async () => {
    setTransactions([]);
    try {
      setLoading(true);
      let functionName = `get${
        transactionType === "" ? "All" : transactionType
      }Transactions`;
      let allTxs = await apiKit[functionName](
        safeAddress,
        0,
        100,
      );

      allTxs = await sanitizeTransactions(allTxs.results);
      setCount(allTxs.length || 0);
      setTransactions(allTxs);
      setLoading(false);
      return allTxs;
    } catch (error) {
      setError(true);
      setLoading(false);
      console.log("error", error);
    }
  }, [safeAddress, apiKit, transactionType]);

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
