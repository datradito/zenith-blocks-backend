import { useQuery } from "@tanstack/react-query";
import fetchTokensOwned from "../../../services/SwapServices/fetchTokensOwned";

export const useGetTokens = (address) => {
    
  const { data, isLoading, isError, refetch } = useQuery({
    //key: ["tokensOwned", address],
    queryKey: ["tokensOwned", address],
    queryFn: fetchTokensOwned,
  });
  

  return {
    tokensOwnedByUser : data,
    isLoading,
    isError,
    refetch,
  };
};