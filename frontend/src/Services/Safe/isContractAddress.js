import { AlchemyProvider} from "ethers";

const isContractAddress = async (address, provider = AlchemyProvider | undefined) => {
  try {
    const code = await provider?.getCode(address);

    return code !== "0x";
  } catch (error) {
    return false;
  }
};

export default isContractAddress;
