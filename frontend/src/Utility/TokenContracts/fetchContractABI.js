import axios from "axios";

const cache = {
    //: contractABI deploy your own testnet contracts for usdc and usdt , put in abi's here in cache to be available by default
};

const validateAddress = (address) => {
    if (!address) {
      throw new Error("Address is required");
    }

    if (typeof address !== "string") {
    throw new Error("Address must be a string");
    }
};

const fetchContractABI = async (contractAddress, chainId) => {
  validateAddress(contractAddress);

  if (cache[contractAddress]) {
    // return cached ABI for address
    return cache[contractAddress];
  }

  try {
    const response = await axios.get(
      `https://api.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`
    );

    if (response.status !== 200) {
      throw new Error(`ABI API request failed with status ${response.status}`);
    }

    const { result } = response.data;
    const data = JSON.parse(result);

    // cache ABI
    cache[contractAddress] = data;

    return data;
  } catch (error) {
    if (error.response) {
      // network error
    } else {
      // parsing error or unexpected error
      throw error;
    }
  }
};

export default fetchContractABI;