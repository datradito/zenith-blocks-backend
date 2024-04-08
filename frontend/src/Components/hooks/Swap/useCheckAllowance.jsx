import { useQuery } from "@tanstack/react-query";
import checkTokenAllowance from "../../../Services/SwapServices/CheckAllowance";

const useCheckAllowance = (tokenAddress, walletAddress) => {
  const { data, error, isLoading, refetch } = useQuery(
    {
      queryKey: ["checkAllowance", tokenAddress, walletAddress],
      queryFn: () => checkTokenAllowance(tokenAddress, walletAddress),
    },
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
