import axios from "axios";
import { ethers } from "ethers";

import getChain from "./getChain";
import { message } from "antd";
const getSafeBalances = async (safeAddress, connectedChainId, options) => {
  if (!connectedChainId) {
    throw new Error("No chainId provided");
  }
  const chain = getChain(connectedChainId);

  const address = ethers.getAddress(safeAddress);
  //https://safe-transaction-mainnet.safe.global/api/v1/safes/0x58eEaD5B22Fc79B1F0b58Be44429337BB9a9700E/balances/?trusted=false&exclude_spam=false
  // Mumbai has no transaction service because it is not part of our official UI https://app.safe.global/
  if (!chain?.transactionServiceUrl) {
    message.error(`No transaction service for ${chain?.label} chain`);
    // throw new Error(`No transaction service for ${chain?.label} chain`)
  }

  const url = `${chain?.transactionServiceUrl}/api/v1/safes/${address}/balances/usd/?trusted=false&exclude_spam=false`;

  const { data: balances } = await axios.get(url, options);

  return balances;
};

export default getSafeBalances;
