import { useQuery } from "@tanstack/react-query";
import fetchTokensOwned from "../../../Services/SwapServices/fetchTokensOwned";

export const useGetTokens = (address) => {
    
  const { data, isLoading, isError, refetch } = useQuery(
    ["tokensOwned", address],
    () => fetchTokensOwned(address),
  );

  return {
    tokensOwnedByUser : data,
    isLoading,
    isError,
    refetch,
  };
};