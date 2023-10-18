const axios = require("axios");
require("dotenv").config();

const axiosConfig = (address) => {
    const data = JSON.stringify({
    jsonrpc: "2.0",
    id: 0,
    method: "alchemy_getAssetTransfers",
    params: [
        {
        fromBlock: "0x0",
        fromAddress: address,
        category: ["external", "internal", "erc20", "erc721", "erc1155"],
        },
    ],
    })

    return {
    method: "post",
    headers: { "Content-Type": "application/json" },
    data: data,
    };

}
        

const baseURL = `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`;
const axiosURL = `${baseURL}`;

const transactionHistory = (address) => {
  const requestOptions = axiosConfig(address);

  return axios(axiosURL, requestOptions)
    .then((response) => {
      return (response.data.result.transfers);
    })
    .catch((error) => {
      throw new Error(`Error fetching token balances: ${error.message}`);
    });
};

module.exports = { transactionHistory };
