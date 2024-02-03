import axios from "axios";
import fetchTokenBalances from "./fetchTokenBalances";

const fetchCurrentTokenBalance = async (address) => {
  const options = {
    method: "POST",
    url: `https://eth-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_KEY}`,
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    data: {
      id: 1,
      jsonrpc: "2.0",
      method: "alchemy_getTokenMetadata",
      params: [address],
    },
  };

  return axios
    .request(options)
    .then(function (response) {
      return response.data.result;
    })
    .catch(function (error) {
      console.error(error);
    });
};

const fetchTokensOwned = async (address) => {
  const listOfTokenOwnedByWallet = [];
  try {
    const { result } = await fetchTokenBalances(address);
    const nonZeroBalances = result.tokenBalances.filter((token) => {
      return token.tokenBalance !== "0";
    });
    // Loop through all tokens with non-zero balance
    for (let token of nonZeroBalances) {
      // Get balance of token

      let balance = token.tokenBalance;

      // Get metadata of token
      try {
        const tokenMetadata = await fetchCurrentTokenBalance(
          token.contractAddress
        );
        // Compute token balance in human-readable format
        balance = balance / Math.pow(10, tokenMetadata.decimals);
        balance = balance.toFixed(2);

        listOfTokenOwnedByWallet.push({
          name: tokenMetadata.name,
          symbol: tokenMetadata.symbol,
          balance,
          logo: tokenMetadata.logo,
        });
      } catch (error) {
        console.error("Error fetching token metadata", error);
        throw error;
      }
    }
  } catch (error) {
    console.error("Error fetching token balances", error);
    throw error;
  }

  return listOfTokenOwnedByWallet;
};

export default fetchTokensOwned;
