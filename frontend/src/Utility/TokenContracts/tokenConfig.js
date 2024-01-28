const tokenConfig = {
  "1": {
    USDT: "0xdac17f958d2ee523a2206206994597c13d831ec7",
    USDC: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
  },
  "0x1": {
    USDT: "0xdac17f958d2ee523a2206206994597c13d831ec7",
    USDC: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
  },
  11155111: {
    USDT: "0x36160274B0ED3673E67F2CA5923560a7a0c523aa",
    USDC: "0x2B0974b96511a728CA6342597471366D3444Aa2a",
  },
  "0xaa36a7": {
    USDT: "0x36160274B0ED3673E67F2CA5923560a7a0c523aa",
    USDC: "0x2B0974b96511a728CA6342597471366D3444Aa2a",
  },
};


export const getTokenContractAddress = (chainId, tokenSymbol)  => {
    if (!tokenConfig[chainId]) {
        throw new Error("ChainId not supported");
    }
    return tokenConfig[chainId][tokenSymbol];
}
