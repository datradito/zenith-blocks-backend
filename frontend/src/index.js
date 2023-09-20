import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from "./App.js"

import '@rainbow-me/rainbowkit/styles.css';
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
} from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, goerli, zkSync } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { alchemyProvider } from 'wagmi/providers/alchemy';

const { chains, publicClient, webSocketPublicClient } = configureChains(
        [
                mainnet,
                polygon,
                optimism,
                zkSync,
                arbitrum,
                goerli,
                ...(process.env.REACT_APP_ENABLE_TESTNETS === 'true' ? [goerli] : []),
        ],
        [alchemyProvider({ apiKey: 'AsxwVAm7iKW3SxGD-z9inFZ9FoYeQ4lQ' }) , publicProvider()]
);

// const { connectors } = getDefaultWallets({
//         appName: 'RainbowKit demo',
//         projectId: 'YOUR_PROJECT_ID',
//         chains,
// });
const projectId = '3a74d330e07a405df9ab1a0ff1825a9b';

const { wallets } = getDefaultWallets({
        appName: 'ZenithBlocks',
        projectId,
        chains,
});


const connectors = connectorsForWallets([
        ...wallets,
        {
                groupName: 'Recommended',
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


const root = ReactDOM.createRoot(
        document.getElementById('root')
);

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
