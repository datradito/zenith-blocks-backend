import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.js";

import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  connectorsForWallets,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import {
  injectedWallet,
  rainbowWallet,
  walletConnectWallet,
  metaMaskWallet,
  safeWallet,
  argentWallet,
  trustWallet,
  ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, goerli } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

// const ganache = {
//   id: "0x539",
//   name: "ganache",
//   network: "ganache",
//   iconBackground: "#fff",
//   nativeCurrency: {
//     decimals: 18,
//     name: "ETHEREUM",
//     symbol: "ETH",
//   },
//   rpcUrls: {
//     default: {
//       http: ["HTTP://127.0.0.1:7545"],
//     },
//   },
//   testnet: true,
// };

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    goerli,
//     ganache,
    ...(process.env.REACT_APP_ENABLE_TESTNETS === "true" ? [goerli] : []),
  ],
  [
    (alchemyProvider({ apiKey: process.env.REACT_APP_ALCHEMY_KEY }),
    publicProvider())
//     jsonRpcProvider({
//       rpc: (chain) => ({
//         http: [`HTTP://127.0.0.1:7545`],
//       }),
//     })
          
  ]
);

const projectId = "3a74d330e07a405df9ab1a0ff1825a9b";

const { wallets } = getDefaultWallets({
  appName: "ZenithBlocks",
  projectId,
  chains,
});

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: "Recommended",
    wallets: [
      injectedWallet({ chains }),
      rainbowWallet({ projectId, chains }),
      walletConnectWallet({ projectId, chains }),
      safeWallet({ chains }),
      metaMaskWallet({ chains }),
      argentWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        theme={darkTheme({
          accentColor: "#7b3fe4",
          accentColorForeground: "white",
          borderRadius: "small",
          overlayBlur: "small",
        })}
        appInfo={{
          appName: "ZenithBlocks",
        }}
        coolMode={true}
        chains={chains}
        showRecentTransactions={true}
      >
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
