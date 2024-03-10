import { useQuery } from "@tanstack/react-query"
import checkTokenAllowance from "../../../services/SwapServices/CheckAllowance";


const useCheckAllowance = (tokenAddress, walletAddress) => {
  const { data, error, isLoading, refetch } = useQuery(
    ["checkAllowance", tokenAddress, walletAddress],
    () => checkTokenAllowance(tokenAddress, walletAddress),
    {
      enabled: false,
    }
  );

  const checkAllowance = () => {
    refetch();
  };

  return { data, error, isLoading, checkAllowance };
};

export default useCheckAllowance;