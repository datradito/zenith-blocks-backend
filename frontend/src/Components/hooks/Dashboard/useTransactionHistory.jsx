import { useQuery } from "@tanstack/react-query";
import getHistoricalTransactions from "../../../Services/DashboardServices/fetchHistoricalTransactions";
import CircularIndeterminate from "../../atoms/Loader/loader";
import { message } from "antd";
import { useAccount } from "wagmi";

const useTransactionHistory = (address, maxCount = "0x3e8") => {
  const { chain } = useAccount();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [
      "transactionHistory",
      address,
      maxCount,
      chain.network,
    ],
    queryFn: getHistoricalTransactions,
  });
  // }
  //   ["transactionHistory", address, maxCount],
  //   async () =>
  //     await getHistoricalTransactions(address, maxCount, chain.network)
  // );

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
