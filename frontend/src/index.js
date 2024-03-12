import React from "react";
import ReactDOM from "react-dom/client";
import theme from "./theme";
import App from "./App.js";
import ErrorFallback from "./components/atoms/ErrorFallback/ErrorFallback";
import { ErrorBoundary } from "react-error-boundary";
import "@rainbow-me/rainbowkit/styles.css";

import config from "./utils/WalletConfig/walletConfig.js";

import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./config/apolloConfig/client.js";

import { ThemeProvider, CssBaseline } from "@mui/material";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => window.location.replace("/accounts")}
        >
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <RainbowKitProvider>
              <App />
            </RainbowKitProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </QueryClientProvider>
    </WagmiProvider>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
