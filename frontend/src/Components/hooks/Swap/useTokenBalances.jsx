import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchTokenBalances from "../../../services/SwapServices/fetchTokenBalances";
import { useAccount } from "wagmi";


const useTokenBalances = (token) => {
  const { address} = useAccount();
  const [tokenBalance, setTokenBalance] = useState(0);

  const { data, isLoading, isError } = useQuery(
    ["tokenBalances", address],
    () => fetchTokenBalances(address),
    {
      enabled: address !== undefined,
    }
  );

  useEffect(() => {
    if (data) {
      const balance = data?.result?.tokenBalances?.find(
        (tokenAddress) =>
          tokenAddress?.contractAddress?.toLowerCase() ===
          token?.address.toLowerCase()
      );
      if (balance) {
        setTokenBalance(
          balance?.tokenBalance / Math.pow(10, token?.decimals)
        );
      } else {
        setTokenBalance(0);
      }
    }
  }, [token]);

  return {
    tokenBalance,
    tokensOwned: data?.result?.tokenBalances,
    isLoading,
    isError,
  };
};

export default useTokenBalances;
