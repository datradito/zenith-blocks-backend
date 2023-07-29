import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from "./App.js"


import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider, connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
        injectedWallet,
        rainbowWallet,
        walletConnectWallet,
        metaMaskWallet,
        safeWallet
} from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, goerli } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';


const { chains, publicClient, webSocketPublicClient } = configureChains(
        [
                mainnet,
                polygon,
                arbitrum,
                goerli,
                ...(process.env.REACT_APP_ENABLE_TESTNETS === 'true' ? [goerli] : []),
        ],
        [publicProvider()]
);

// const { connectors } = getDefaultWallets({
//         appName: 'RainbowKit demo',
//         projectId: 'YOUR_PROJECT_ID',
//         chains,
// });
const projectId = '5777';

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
                ],
        },
]);

const wagmiConfig = createConfig({
        connectors,
        publicClient,
        webSocketPublicClient,
});

const root = ReactDOM.createRoot(
        document.getElementById('root')
);

root.render(
        <React.StrictMode>
                <WagmiConfig config={wagmiConfig}>
                        <RainbowKitProvider
                                appInfo={{
                                        appName: 'ZenithBlocks',
                                }}
                                chains={chains}
                                showRecentTransactions={true}
                        >
                                <App />   
                        </RainbowKitProvider>
                </WagmiConfig>
        </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
