import "./App.css";
import React, { Suspense } from "react";
import { ApolloProvider } from "@apollo/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient, client } from "./apolloConfig/client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { storeConfig, persistor } from "./store/storeConfigure";
import { PersistGate } from "redux-persist/integration/react";
import CircularIndeterminate from "./Components/atoms/Loader/loader";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./Utility/Providers/UserProvider";
import { router } from "./Routes/Router";
import SwapProvider from "./Utility/Providers/SwapProvider";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ApolloProvider client={client}>
        <Provider store={storeConfig}>
          <PersistGate loading={null} persistor={persistor}>
            <SwapProvider>
            <UserProvider>
              <Suspense fallback={<CircularIndeterminate />}>
                <RouterProvider router={router} />
              </Suspense>
              </UserProvider>
            </SwapProvider>
            <Toaster
              position="top-center"
              gutter={12}
              containerStyle={{ margin: "8px" }}
              toastOptions={{
                success: {
                  duration: 3000,
                },
                error: {
                  duration: 5000,
                },
                style: {
                  fontSize: "1rem",
                  maxWidth: "500px",
                  padding: "12px 24px",
                  backgroundColor: "white",
                  color: "var(--color-grey-700)",
                },
              }}
            />
          </PersistGate>
        </Provider>
      </ApolloProvider>
    </QueryClientProvider>
  );
}

export default App;
