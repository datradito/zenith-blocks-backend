import chains from "../../utils/constants/chains";

const getChain = (chainId) => {

  const chain = chains.find((chain) => chain.id === chainId.toString());

  return chain;
};

export default getChain;
