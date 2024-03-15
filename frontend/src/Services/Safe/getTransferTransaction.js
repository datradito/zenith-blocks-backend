import { ERC_20_ABI } from "../../utils/constants/erc20Transfer.js";
import { ethers } from "ethers";

let ABI = ["function transfer(address to, uint amount)"];

function encodeTxData(recipient, value) {
  const ethersInterface = new ethers.Interface(ABI);
  return ethersInterface.encodeFunctionData("transfer", [recipient, value]);
}

function getTransferTransaction(value, recipient, erc20Address) {
  if (erc20Address === ethers.ZeroAddress) {
    return {
      // Send Native token directly to the recipient address
      to: recipient,
      value: value,
      data: "0x",
    };
  }

  return {
    // For other token types, generate a contract tx
    to: recipient,
    value: "0",
    data: encodeTxData(recipient, value),
  };
}

export { getTransferTransaction };
