import "./App.css";
import React, { Suspense, lazy } from "react";
import { ApolloProvider } from "@apollo/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient, client } from "./apolloConfig/client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Provider } from "react-redux";
import { storeConfig, persistor } from "./store/storeConfigure";
import { PersistGate } from "redux-persist/integration/react";
import ErrorPage from "./Routes/ErrorPage";
import CircularIndeterminate from "./Components/atoms/Loader/loader";
import Root from "./Routes/Root";

import ProposalRoute from "./Routes/ProposalDependentRoutes";
import InvoiceRoutes from "./Routes/InvoiceDependentRoutes";

import PrivateRoute from "./Routes/PrivateRoutes";
import PaymentCreation, {
  paymentLoader,
} from "./Components/pages/Payments/PaymentCreation";

import { Toaster } from "react-hot-toast";
import { UserProvider } from "./Utility/Providers/UserProvider";
import NotFound from "./Routes/NotFound";
const ProposalDetailView = lazy(() => import("./Components/pages/Proposals/ProposalDetailView"));
const CreateBudget = lazy(() => import("./Components/pages/Budgets/CreateBudget"));
const InvoiceListView = lazy(() => import("./Components/pages/Invoices/InvoiceListView"));
const InvoiceCreation = lazy(() => import("./Components/pages/Invoices/CreateInvoice"));
const Dashboard = lazy(() => import("./Components/pages/walletDashboard/Dashboard"));
const Swap = lazy(() => import("./Components/pages/Swap/Swap"));
const Proposals = lazy(() => import("./Components/pages/Proposals/Proposals"));
const Accounts = lazy(() => import("./Components/pages/Accounts/Accounts"));

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Root />
          </PrivateRoute>
        }
        errorElement={<ErrorPage />}
      >
        {/* <Route path="/login" element={<Login />} /> */}
        <Route
          path="proposals"
          element={<Proposals />}
          errorElement={<ErrorPage />}
        />
        <Route
          path="proposals/:proposalId/budgets"
          element={<ProposalDetailView />}
          errorElement={<ErrorPage />}
        />
        <Route path="budgets" element={<ProposalRoute />}>
          <Route
            path=":proposalId/create"
            element={<CreateBudget />}
            errorElement={<ErrorPage />}
          />
        </Route>

        <Route
          path="invoice/:invoiceId/payment"
          element={<PaymentCreation />}
          errorElement={<ErrorPage />}
          loader={({ params }) => {
            return paymentLoader(params.invoiceId);
          }}
          action={({ params, request }) => {
            console.log(request);
          }}
        />

        <Route path="budgets" element={<InvoiceRoutes />}>
          <Route
            path=":budgetId/invoices"
            element={<InvoiceListView />}
            errorElement={<ErrorPage />}
          />
        </Route>
        <Route
          path="invoices/:budgetId/create"
          errorElement={<ErrorPage />}
          element={<InvoiceCreation />}
        />
        <Route
          path="dashboard"
          element={<Dashboard />}
          // loader={({ params, request }) => {
          //   return dashboardLoader();
          // }}
          errorElement={<ErrorPage />}
        />
        <Route
          path="accounts"
          errorElement={<ErrorPage />}
          element={<Accounts />}
        />
        <Route path="swap" element={<Swap />} errorElement={<ErrorPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ApolloProvider client={client}>
        <Provider store={storeConfig}>
          <PersistGate loading={null} persistor={persistor}>
            <UserProvider>
              <Suspense fallback={<CircularIndeterminate />}>
                <RouterProvider router={router} />
              </Suspense>
            </UserProvider>
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
