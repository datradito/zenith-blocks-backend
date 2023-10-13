import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchTokenBalances = async (address) => {
  const options = {
    method: "POST",
    url: "https://eth-mainnet.g.alchemy.com/v2/lEGKZZGhfRvbQpmmgA5ryibHnMO4Czq0",
    headers: { accept: "application/json", "content-type": "application/json" },
    data: {
      id: 1,
      jsonrpc: "2.0",
      method: "alchemy_getTokenBalances",
      params: [address, "erc20"],
    },
  };

  const response = await axios.request(options);
  return response.data;
};

const useTokenBalances = (address) => {
  return useQuery(
    ["tokenBalances", address],
    () => fetchTokenBalances(address),
    {
      enabled: address !== undefined,
    }
  );
};

export default useTokenBalances;
