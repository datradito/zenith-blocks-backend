import "./App.css";
import React, { Suspense } from "react";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apolloConfig/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { storeConfig, persistor } from "./store/storeConfigure";
import { PersistGate } from "redux-persist/integration/react";
import CircularIndeterminate from "./Components/atoms/Loader/loader";
import { UserProvider } from "./Utility/Providers/UserProvider";
import { router } from "./Routes/Router";
import { AccountAbstractionProvider } from "./Utility/Providers/AccountAbstractionContext";

function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={storeConfig}>
        <PersistGate loading={null} persistor={persistor}>
          <UserProvider>
            <AccountAbstractionProvider>
              <Suspense fallback={<CircularIndeterminate />}>
                <RouterProvider router={router} />
              </Suspense>
            </AccountAbstractionProvider>
          </UserProvider>
        </PersistGate>
      </Provider>
    </ApolloProvider>
  );
}

export default React.memo(App);
