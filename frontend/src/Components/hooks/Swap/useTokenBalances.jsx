import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAccount } from "wagmi";

const fetchTokenBalances = async (address) => {
  const options = {
    method: "POST",
    url: `https://eth-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_KEY}`,
    headers: { accept: "application/json", "content-type": "application/json" },
    data: {
      id: 1,
      jsonrpc: "2.0",
      method: "alchemy_getTokenBalances",
      params: [address, "erc20"],
    },
  };

  try{
    const response = await axios.request(options);
    return response.data;
  } 
  catch (error) {
    console.error(error);
  }

};

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
    isLoading,
    isError,
  };
};

export default useTokenBalances;
