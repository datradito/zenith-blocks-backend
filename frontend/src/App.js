import './App.css';
import React, { useState, Suspense, lazy, useEffect } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { Provider } from 'react-redux';
import { storeConfig, persistor } from './store/storeConfigure';
import { PersistGate } from 'redux-persist/integration/react';
import ErrorPage from "./Routes/ErrorPage";
import CircularIndeterminate from './Components/atoms/Loader/loader';
import Root from './Routes/Root';

import ErrorProvider from './Routes/ErrorRouterProvider';
import ProposalRoute from './Routes/ProposalDependentRoutes';
import InvoiceRoutes from './Routes/InvoiceDependentRoutes';

import { links } from './apolloConfig/links';
import PrivateRoute from './Routes/PrivateRoutes';
import PaymentCreation from './Components/pages/Payments/PaymentCreation';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TransferHistory = lazy(() => import("./Components/pages/walletDashboard/Components/TransferHistory.jsx"));
const ProposalDetailView = lazy(() => import("./Components/pages/Proposals/ProposalDetailView"));
const CreateBudget = lazy(() => import("./Components/pages/Budgets/CreateBudget"));
const InvoiceListView = lazy(() => import("./Components/pages/Invoices/InvoiceListView"));
const InvoiceCreation = lazy(() => import("./Components/pages/Invoices/InvoiceCreation"));
const Dashboard = lazy(() => import("./Components/pages/walletDashboard/Dashboard"));
const Swap = lazy(() => import("./Components/pages/Swap/Swap"));
const Proposals = lazy(() => import("./Components/pages/Proposals/Proposals"));
const Accounts = lazy(() => import("./Components/pages/Accounts/Accounts"));

const client = new ApolloClient({
  link: links,
  cache: new InMemoryCache(),
});

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="proposals" element={<Proposals />} />
          <Route
            path="proposals/:proposalId"
            element={<ProposalDetailView />}
            errorElement={<ErrorPage />}
          />

          <Route path="proposal" element={<ProposalRoute />}>
            <Route path="update/:proposalId" element={<CreateBudget />} />
            <Route
              path=":proposalId/invoices"
              element={<InvoiceListView />}
              errorElement={<ErrorPage />}
            />
          </Route>

          <Route
            path="invoice/:invoiceId/payment"
            element={<PaymentCreation />}
          />

          <Route path="budgets" element={<InvoiceRoutes />}>
            <Route
              path=":budgetId/invoices"
              element={<InvoiceListView />}
              errorElement={<ErrorPage />}
            />
            <Route
              path=":budgetId/createInvoice"
              element={<InvoiceCreation />}
            />
          </Route>
          <Route path="dashboard" element={<Dashboard />} />
          <Route
            path="accounts"
            errorElement={<ErrorPage />}
            element={<Accounts />}
          />
          <Route path="swap" element={<Swap />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Route>
    )
  );

    return (
    <ApolloProvider client={client}>
        <Provider store={storeConfig}>
          <PersistGate loading={null} persistor={persistor}>
            <Suspense fallback={<CircularIndeterminate />}>
              <ErrorProvider>
                <ToastContainer
                  limit={2}
                  position="bottom-left"
                />
                <RouterProvider router={router} />
              </ErrorProvider>
            </Suspense>
          </PersistGate>
        </Provider>
    </ApolloProvider>
    );
}

export default App;

