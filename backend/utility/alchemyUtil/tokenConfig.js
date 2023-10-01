const axios = require('axios');

const generateAxiosConfig = (address) => {
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
    url: "https://eth-mainnet.g.alchemy.com/v2/AsxwVAm7iKW3SxGD-z9inFZ9FoYeQ4lQ",
  };

  return { config };
};
const getTokenBalances = async (requestConfig, metadata) => {
  try {
    let response = await axios(requestConfig);
      response = response["data"];

    // Getting balances from the response
      const balances = response["result"];

    // Remove tokens with zero balance
    const nonZeroBalances = balances.tokenBalances.filter((token) => {
      return token.tokenBalance !== "0";
    });

      const tokenData = [];
      
      for (token of nonZeroBalances) {
            let balance = token.tokenBalance;

    // options for making a request to get the token metadata
          
          try {
              metadata = await getTokenMetadata(token);
                  balance =
                    balance / Math.pow(10, metadata["data"]["result"].decimals);
              balance = balance.toFixed(2);

                  tokenData.push({
                    name: metadata.data.result.name,
                    symbol: metadata.data.result.symbol,
                    balance,
                    logo: metadata.data.result.logo,
                  });
          }
          catch (error) {
              throw new Error(`Error fetching ${token} metadata: ${error.message}`);
        }
    };
    return tokenData;
  } catch (error) {
    throw new Error(`Error fetching token balances: ${error.message}`);
  }
};

const getTokenMetadata = (token) => {
    const options = {
        method: "POST",
        url: "https://eth-mainnet.g.alchemy.com/v2/AsxwVAm7iKW3SxGD-z9inFZ9FoYeQ4lQ",
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


module.exports = {
    generateAxiosConfig,
    getTokenBalances
};
