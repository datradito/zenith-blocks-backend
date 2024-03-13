import React, { Suspense } from "react";
import { ApolloProvider } from "@apollo/client";
import { client } from "./config/apolloConfig/client";
import { RouterProvider } from "react-router-dom";
import CircularIndeterminate from "./components/atoms/Loader/loader";
import { router } from "./routes/Router";

function App() {
  return (
    <ApolloProvider client={client}>
      <Suspense fallback={<CircularIndeterminate />}>
        <RouterProvider router={router} />
      </Suspense>
    </ApolloProvider>
  );
}

export default React.memo(App);
