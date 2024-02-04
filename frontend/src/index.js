import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.js";
import ErrorFallback from "./Components/atoms/ErrorFallback/ErrorFallback";
import { ErrorBoundary } from "react-error-boundary";
import "@rainbow-me/rainbowkit/styles.css";

import { SafeThemeProvider } from "@safe-global/safe-react-components";
import { ThemeProvider, CssBaseline } from "@mui/material";

import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";

import { configureChains, createConfig, WagmiConfig } from "wagmi";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  goerli,
  base,
  zkSync,
} from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { safeWallet } from '@rainbow-me/rainbowkit/wallets';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    goerli,
    base,
    zkSync,
    ...(process.env.REACT_APP_ENABLE_TESTNETS === "true" ? [goerli] : []),
  ],
  [
    (alchemyProvider({ apiKey: "AsxwVAm7iKW3SxGD-z9inFZ9FoYeQ4lQ" }),
    publicProvider()),
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
    groupName: "Other",
    wallets: [
      safeWallet({
        chains: chains,
      }),
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
          accentColor: "#055FFC",
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
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => window.location.replace("/proposals")}
        >
          <SafeThemeProvider mode="dark">
            {(safeTheme) => (
              <ThemeProvider theme={safeTheme}>
                <CssBaseline />
                <App />
              </ThemeProvider>
            )}
          </SafeThemeProvider>
        </ErrorBoundary>
      </RainbowKitProvider>
    </WagmiConfig>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
