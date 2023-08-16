import './App.css';
import React, { useState, Suspense, lazy, useEffect } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { Provider } from 'react-redux';
import { storeConfig, persistor } from './store/storeConfigure';
import { PersistGate } from 'redux-persist/integration/react';
import ErrorPage from "./Routes/ErrorPage";
import CircularIndeterminate from './Components/atoms/Loader/loader';
import WalletConnect from './Components/DisplayElements/Header/WalletConnect';
import Root from './Routes/Root';

import { links } from './apolloConfig/links';

const TransferHistory = lazy(() => import("./Components/pages/walletDashboard/Components/TransferHistory.jsx"));
const ResponsiveHeaderBar = lazy(() => import("./Components/DisplayElements/Header/Header"));
const ProposalDetailView = lazy(() => import("./Components/pages/Proposals/ProposalDetailView"));
const CreateBudget = lazy(() => import("./Components/pages/Budgets/CreateBudget"));
const InvoiceListView = lazy(() => import("./Components/pages/Invoices/InvoiceListView"));
const InvoiceCreation = lazy(() => import("./Components/pages/Invoices/InvoiceCreation"));
const Dashboard = lazy(() => import("./Components/pages/walletDashboard/Dashboard"));
const CustomizedSnackbars = lazy(() => import("./Components/atoms/SnackBar/SnackBar"));
const LogIn = lazy(() => import("./Components/pages/Home/logIn"));
const Swap = lazy(() => import("./Components/pages/Swap/Swap"));
const Proposals = lazy(() => import("./Components/pages/Proposals/Proposals"));

function App() {
  const [walletConnected, setWalletConnected] = useState(false);

  const [snackbarMessage, setSnackbarMessage] = useState({
    open: false,
    severity: 'error',
    message: '',
  });

  useEffect(() => {
    sessionStorage.getItem('authToken') ? setWalletConnected(true) : setWalletConnected(false);
  }, [walletConnected]);

  // if (snackbarMessage.open) {
  //     const timer = setTimeout(() => {
  //       setSnackbarMessage({ open: false, severity: 'error', message: '' });
  //     }, 4000);
  //     return () => clearTimeout(timer);
  // }

  const client = new ApolloClient({
    link: links,
    cache: new InMemoryCache(),
  });

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/"element={<Root />}>
        <Route index
          element={<Proposals />}
        />
        <Route path="proposals/:proposalId" element={<ProposalDetailView />} />
        <Route path="proposal/budgets/:proposalId" element={<CreateBudget />} />
        <Route path="budgets/:budgetId/createInvoice" element={<InvoiceCreation />} />
        <Route path="proposal/update/:proposalId" element={<CreateBudget />} />
        <Route path="proposals/:proposalId/invoices" element={<InvoiceListView />} />
        <Route path="budgets/:budgetId/invoices" element={<InvoiceListView />} />
        <Route path="dashboard" element={<Dashboard />} >
          {/* <Route path="transferHistory" element={<TransferHistory />} />  
          <Route path="tokens" element={<TransferHistory />} /> */}
        </Route>
        <Route path="swap" element={<Swap />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    )
  );

  return (
    <ApolloProvider client={client}>
      <Provider store={storeConfig}>
        <PersistGate loading={null} persistor={persistor}>
          <Suspense fallback={<CircularIndeterminate />}>
            {!walletConnected ? <WalletConnect /> : <RouterProvider router={router} />}
            </Suspense>
        </PersistGate>
      </Provider>
    </ApolloProvider>
  );
}

export default App;



// import React from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
// import { ApolloProvider } from '@apollo/client';
// import { Provider } from 'react-redux';
// import { storeConfig, persistor } from './your-store-config';
// import { client } from './your-apollo-client';
// import ResponsiveHeaderBar from './components/ResponsiveHeaderBar';
// import Proposals from './components/Proposals';
// import ProposalDetailView from './components/ProposalDetailView';
// import CreateBudget from './components/CreateBudget';
// import InvoiceCreation from './components/InvoiceCreation';
// import InvoiceListView from './components/InvoiceListView';
// import Swap from './components/Swap';
// import ErrorPage from './components/ErrorPage';

// // Custom route guard function
// const PrivateRoute = ({ element: Component, ...rest }) => {
//   const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

//   return (
//     <Route
//       {...rest}
//       element={
//         isAuthenticated ? <Component /> : <Navigate to="/login" replace />
//       }
//     />
//   );
// };

// const App = () => {
//   return (
//     <ApolloProvider client={client}>
//       <Provider store={storeConfig}>
//         <PersistGate loading={null} persistor={persistor}>
//           <BrowserRouter>
//             {/* <SnackbarMessage
//               open={snackbarMessage.open}
//               severity={snackbarMessage.severity}
//               message={snackbarMessage.message}
//             /> */}
//             <ResponsiveHeaderBar />
//             <Routes>
//               <Route exact path="/login" element={<LoginPage />} />
//               <Route exact path="/register" element={<RegisterPage />} />
//               <PrivateRoute exact path="/proposals" element={<Proposals />} />
//               <PrivateRoute
//                 exact
//                 path="/proposals/:proposalId"
//                 element={<ProposalDetailView />}
//               />
//               <PrivateRoute
//                 exact
//                 path="/proposal/budgets/:proposalId"
//                 element={<CreateBudget />}
//               />
//               <PrivateRoute
//                 exact
//                 path="/proposal/budgets/createInvoice"
//                 element={<InvoiceCreation />}
//               />
//               <PrivateRoute
//                 exact
//                 path="/budgets/:budgetId/createInvoice"
//                 element={<InvoiceCreation />}
//               />
//               <PrivateRoute
//                 exact
//                 path="/proposal/update/:proposalId"
//                 element={<CreateBudget />}
//               />
//               <PrivateRoute
//                 exact
//                 path="/proposals/:proposalId/invoices"
//                 element={<InvoiceListView />}
//               />
//               <PrivateRoute
//                 exact
//                 path="/budgets/:budgetId/invoices"
//                 element={<InvoiceListView />}
//               />
//               <PrivateRoute exact path="/swap" element={<Swap />} />
//               <Route element={<ErrorPage />} />
//             </Routes>
//           </BrowserRouter>
//         </PersistGate>
//       </Provider>
//     </ApolloProvider>
//   );
// };
// export default App;
