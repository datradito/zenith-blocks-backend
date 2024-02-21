import { http } from "@wagmi/core";
import { mainnet, sepolia, goerli } from "@wagmi/core/chains";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";


const projectId = "3a74d330e07a405df9ab1a0ff1825a9b";


const config = getDefaultConfig({
  appName: "Zenith",
  projectId: projectId,
  chains: [mainnet, sepolia, goerli],
  // transports: {
  //   [mainnet.id]: http(
  //     `https://eth-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_KEY}`
  //   ),
  //   [sepolia.id]: http(
  //     `https://sepolia.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`
  //   ),
  //   [goerli.id]: http(
  //     `https://goerli.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`
  //   ),
  // },
});

localStorage.clear();

export default config;
