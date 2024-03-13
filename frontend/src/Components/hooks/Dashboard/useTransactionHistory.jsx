import { useEffect, useState, useMemo } from "react";
import CircularIndeterminate from "../../atoms/Loader/loader";
import { useCallback } from "react";
import usePolling from "../Safe/usePolling";
import SafeTransactionsService from "../../../Services/DashboardServices/safeTransactions";
import useSafeStore from "../../../store/modules/safe/index.ts";
import useDashboardStore from "../../../store/modules/dashboard/index.ts";
import SafeApiKit from "@safe-global/api-kit";

const useTransactionHistory = () => {
  const safe = useSafeStore((state) => state);
  const { transactionFilter, onChangeLoading, loading, setTransactions } = useDashboardStore();
  const [txs, setTxs ] = useState([]);
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

        setTransactions(sanitizedTransactions);
      } catch (error) {
        console.error("Error sanitizing transactions", error);
        throw error;
      }

      return sanitizedTransactions;
    };
  }, [transactionFilter]);

  useEffect(() => {
    onChangeLoading(loading);
  }, [loading]);

  const safeTransactions = useCallback(async () => {
    setTxs([]);
    try {
      onChangeLoading(true);
      let functionName = `get${
        transactionFilter.activeTab === "" ? "All" : transactionFilter.activeTab
        }Transactions`;
      

      const apiKit = new SafeApiKit({ chainId: safe.chainId });
      let allTxs = await apiKit[functionName](safe.safeSelected, 0, 100);

      setCount(allTxs.count || 0);
      allTxs = await sanitizeTransactions(allTxs.results);
      setTxs(allTxs);

      onChangeLoading(false);
      return allTxs;
    } catch (error) {
      console.error("Error fetching transactions", error);
      setError(true);
      onChangeLoading(false);
    }
  }, [safe.safeSelected, safe.apiKit, transactionFilter]);

  usePolling(safeTransactions);

  loading && <CircularIndeterminate />;
  return {
    txs,
    loading,
    count,
    error,
  };
};

export default useTransactionHistory;
