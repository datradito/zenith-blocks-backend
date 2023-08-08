import './App.css';
import React, { useState, Suspense, lazy } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { storeConfig, persistor } from './store/storeConfigure';
import { PersistGate } from 'redux-persist/integration/react';
import ErrorPage from "./Routes/ErrorPage";

const ResponsiveHeaderBar = lazy(() => import("./Components/DisplayElements/Header/Header"));
const ProposalDetailView = lazy(() => import("./Components/pages/Proposals/ProposalDetailView"));
const CreateBudget = lazy(() => import("./Components/pages/Budgets/CreateBudget"));
const InvoiceListView = lazy(() => import("./Components/pages/Invoices/InvoiceListView"));
const InvoiceCreation = lazy(() => import("./Components/pages/Invoices/InvoiceCreation"));
const Dashboard = lazy(() => import("./Components/pages/walletDashboard/Dashboard"));
const CustomizedSnackbars = lazy(() => import("./Components/atoms/SnackBar/SnackBar"));
const Swap = lazy(() => import("./Components/pages/Swap/Swap"));
const Proposals = lazy(() => import("./Components/pages/Proposals/Proposals"));


function App() {

  const [snackbarMessage, setSnackbarMessage] = useState({
    open: false,
    severity: 'error', // Default to 'error' severity for error messages
    message: '',
  });

  const httpLink = createHttpLink({
    uri: `http://localhost:8000/graphql`,
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message }) => {
        alert(message);
        // setSnackbarMessage({ open: true, severity: 'error', message });
      });
    }
    if (networkError) {
      alert(`Network Error: ${networkError}`);
      // setSnackbarMessage({ open: true, severity: 'error', message: `Network Error: ${networkError}` });
    }
  });


  // if (snackbarMessage.open) {
  //     const timer = setTimeout(() => {
  //       setSnackbarMessage({ open: false, severity: 'error', message: '' });
  //     }, 4000);
  //     return () => clearTimeout(timer);
  // }


  const client = new ApolloClient({
    link: errorLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  // sessionService.initSessionService(storeConfig);

  return (
  
        <ApolloProvider client={client}>
          <Provider store={ storeConfig }>
            <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
            <CustomizedSnackbars
              autoOpen={true}
              severity={snackbarMessage.severity}
              message={snackbarMessage.message}
            />
              <ResponsiveHeaderBar />
                <Routes>
                  <Route exact path="/proposals" element={<Proposals />} />
                  <Route exact path="/proposals/:proposalId" element={<ProposalDetailView />} />
                  <Route exact path="/proposal/budgets/:proposalId" element={<CreateBudget />} />
              <Route exact path="/proposal/budgets/createInvoice" element={<InvoiceCreation />} />
              <Route exact path="/budgets/:budgetId/createInvoice" element={<InvoiceCreation />} />
                  <Route exact path="/proposal/update/:proposalId" element={<CreateBudget />} />
                  <Route exact path="/proposals/:proposalId/invoices" element={<InvoiceListView />} />
              <Route exact path="/budgets/:budgetId/invoices" element={<InvoiceListView />} />
              <Route exact path="/dashboard" element={<Dashboard />} />
              <Route exact path="/swap" element={<Swap />} />
                  <Route element={<ErrorPage />} />
              </Routes>
            </Suspense>
              </BrowserRouter>
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
