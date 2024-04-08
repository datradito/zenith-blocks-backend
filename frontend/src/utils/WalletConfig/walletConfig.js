import { mainnet, sepolia, optimism, bsc, gnosis, zkSync } from "@wagmi/core/chains";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from "wagmi";
const projectId = "3a74d330e07a405df9ab1a0ff1825a9b";


const config = getDefaultConfig({
  appName: "Zenith",
  projectId: projectId,
  chains: [mainnet, sepolia, optimism, bsc, gnosis, zkSync],
  // transports: {
  //   [sepolia.id]: http(
  //     `https://sepolia.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`
  //   ),
  //   // [goerli.id]: http(
  //   //   `https://goerli.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`
  //   // ),
  // },
});


export default config;
