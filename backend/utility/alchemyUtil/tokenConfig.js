import axios from "axios";
export const generateAxiosConfig = (address) => {
  const data = JSON.stringify({
    jsonrpc: "2.0",
    method: "alchemy_getTokenBalances",
    headers: {
      "Content-Type": "application/json",
    },
    params: [address],
    id: 42,
  });

  const config = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
    url: `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
  };

  return { config };
};
export const getTokenBalances = async (requestConfig, metadata) => {
  try {
    let response = await axios(requestConfig);
    response = response["data"];
    const balances = response["result"];
    const nonZeroBalances = balances.tokenBalances.filter((token) => {
      return token.tokenBalance !== "0";
    });

    const tokenData = [];

    for (token of nonZeroBalances) {
      let balance = token.tokenBalance;
      try {
        metadata = await getTokenMetadata(token);

        balance = balance / Math.pow(10, metadata["data"]["result"].decimals);
        balance = balance.toFixed(2);

        tokenData.push({
          name: metadata.data.result.name,
          symbol: metadata.data.result.symbol,
          balance,
          logo: metadata.data.result.logo,
        });
      } catch (error) {
        throw new Error(`Error fetching ${token} metadata: ${error.message}`);
      }
    }
    return tokenData;
  } catch (error) {
    throw new Error(`Error fetching token balances: ${error.message}`);
  }
};

export const getTokenMetadata = (token) => {
  const options = {
    method: "POST",
    url: `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    data: {
      id: 1,
      jsonrpc: "2.0",
      method: "alchemy_getTokenMetadata",
      params: [token.contractAddress],
    },
  };
  return axios.request(options);
};


