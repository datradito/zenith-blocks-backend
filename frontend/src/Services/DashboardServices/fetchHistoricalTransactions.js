import axios from "axios";

/**
 * Fetches historical transactions for an address from Alchemy API.
 *
 * @param {string} address - The address to get transactions for
 * @param {number} maxCount - The maximum number of transactions to return
 * @param {string} network - The network name
 * @returns {Promise} Promise resolving to the transaction history or rejecting on error
 */
const getHistoricalTransactions = async (
  address,
  maxCount,
  network = "eth-mainnet"
) => {

  network = network === "homestead" ? "eth-mainnet" : "eth-rinkeby";
  const requestOptions = {
    method: "POST",
    url: `https://${network}.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_KEY}`,
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    data: {
      id: 1,
      jsonrpc: "2.0",
      method: "alchemy_getAssetTransfers",
      params: [
        {
          fromBlock: "0x0",
          toBlock: "latest",
          toAddress: address,
          withMetadata: false,
          excludeZeroValue: true,
          maxCount: maxCount || "0x3e8",
          category: ["erc20"],
        },
      ],
    },
  };

  try {
    const response = await axios.request(requestOptions);

    return response.data;
  } catch (error) {
    // Throw error so calling code can properly handle failures
    throw new Error("Error fetching transaction history");
  }
};

export default getHistoricalTransactions;
