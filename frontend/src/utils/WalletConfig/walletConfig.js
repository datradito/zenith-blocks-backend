import { mainnet, sepolia, gnosisChiado } from "@wagmi/core/chains";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from "@wagmi/core";

const projectId = "3a74d330e07a405df9ab1a0ff1825a9b";

/* adding gnosis network */
const GnosisChain = {
  id: 100,
  name: 'Gnosis Chain',
  network: 'Gnosis',
  nativeCurrency: {
    decimals: 18,
    name: 'xDai',
    symbol: 'xDai',
  },
  rpcUrls: {
    default: 'https://rpc.ankr.com/gnosis',
  },
  blockExplorers: {
    default: { name: 'Blockscout', url: 'https://gnosisscan.io/' },
  },
  iconUrls: ["https://images.prismic.io/koinly-marketing/16d1deb7-e71f-48a5-9ee7-83eb0f7038e4_Gnosis+Chain+Logo.png"],
  testnet: false,
}

const config = getDefaultConfig({
  appName: "Zenith",
  projectId: projectId,
  chains: [
    mainnet,
    sepolia,
    gnosisChiado
  ],
  // transports: {
  //   [gnosisChiado.id]: http(`https://rpc.chiadochain.net`),
  //   // [sepolia.id]: http(
  //   //   `https://sepolia.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`
  //   // ),
  //   // [goerli.id]: http(
  //   //   `https://goerli.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`
  //   // ),
  // },
});


export default config;
