import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from "./App.js"

// import { SafeConnector } from 'wagmi/connectors/safe'

import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider, connectorsForWallets } from '@rainbow-me/rainbowkit';
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
import { Zoom } from '@mui/material';


const { chains, publicClient } = configureChains(
        [
                mainnet,
                polygon,
                optimism,
                zkSync,
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
                        argentWallet({ projectId, chains }),
                        trustWallet({ projectId, chains }),
                        ledgerWallet({ projectId, chains }),
                ],
        },
]);
// const connector = new SafeConnector({
//         chains: [mainnet, optimism],
//         options: {
//                 allowedDomains: [/gnosis-safe.io$/, /app.safe.global$/],
//                 debug: false,
//         },
// })

const wagmiConfig = createConfig({
        autoConnect: true,
        connectors,
        publicClient
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
                                coolMode={true}
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
