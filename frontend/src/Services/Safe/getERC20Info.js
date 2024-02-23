import { ethers } from "ethers";
import erc20ABI from "../../Constants/erc20Abi.json";
// import { ERC20Token } from "src/models/erc20token";

/**
 * Retrieve infos for an ERC20 token by its contract address.
 * @param erc20Address ERC20 token contract address
 * @param provider web3 provider
 * @param accountAddress address to get the ERC20 token balance for
 * @returns the infos for the given token or undefined if no valid ERC20 address was provided
 */
export const getERC20Info = async (
  erc20Address,
  provider,
  accountAddress
) => {
  console.log("erc20Address", erc20Address);
  if (erc20Address === ethers.ZeroAddress) {
    return undefined;
  }


  const contract = new ethers.Contract(erc20Address, erc20ABI, provider);

  console.log("contract", contract);
  const [balance, decimals, symbol] = await Promise.all([
    accountAddress != null
      ? contract.balanceOf(accountAddress)
      : Promise.resolve(),
    contract.decimals(),
    contract.symbol(),
  ]);
  console.log("balance", balance);

  return { address: erc20Address, balance, decimals, symbol };
};
