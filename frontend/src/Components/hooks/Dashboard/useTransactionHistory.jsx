import { useQuery } from "@tanstack/react-query";
import getHistoricalTransactions from "../../../Services/DashboardServices/fetchHistoricalTransactions";
import CircularIndeterminate from "../../atoms/Loader/loader";
import { message } from "antd";
import { useNetwork } from "wagmi";

const useTransactionHistory = (address, maxCount = "0x3e8") => {
  const { chain } = useNetwork();
  const { data, isLoading, isError, refetch } = useQuery(
    ["transactionHistory", address, maxCount],
    async () =>
      await getHistoricalTransactions(address, maxCount, chain.network)
  );

  isLoading && <CircularIndeterminate />;
  isError && message.error("Error fetching transaction history");

  //returns list of transactions, loading state, error state, and refetch function
  return {
    transactionHistory: data?.result.transfers,
    isLoading,
    isError,
    refetch,
  };
};

export default useTransactionHistory;
