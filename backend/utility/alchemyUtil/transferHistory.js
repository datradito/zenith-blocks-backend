const axios =  require("axios");

let data = JSON.stringify({
  jsonrpc: "2.0",
  id: 0,
  method: "alchemy_getAssetTransfers",
  params: [
    {
      fromBlock: "0x0",
      fromAddress: "0x715A21B7683f15FF5920689196AF0E8b68f990A7",
      category: ["external", "internal", "erc20", "erc721", "erc1155"],
    },
  ],
});

var requestOptions = {
  method: "post",
  headers: { "Content-Type": "application/json" },
  data: data,
};

const baseURL = `https://eth-mainnet.g.alchemy.com/v2/AsxwVAm7iKW3SxGD-z9inFZ9FoYeQ4lQ`;
const axiosURL = `${baseURL}`;

axios(axiosURL, requestOptions)
  .then((response) => console.log(JSON.stringify(response.data, null, 2)))
  .catch((error) => console.log(error));
