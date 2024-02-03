import { useQuery } from "@tanstack/react-query";
import fetchTokenPrices from "../../../Services/SwapServices/fetchTokenPrices";

const useGetTokensPrices = (addresses, fetchPrice) => {
  const { data, isLoading, isError, refetch } = useQuery(
    ["tokenPrices", addresses],
    () => fetchTokenPrices(addresses),
    {
      enabled: fetchPrice,
    }
  );

  return {
    data,
    isLoading,
    isError,
    refetch,
  };
};

export default useGetTokensPrices;
