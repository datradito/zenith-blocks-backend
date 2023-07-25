import './App.css';
import React from 'react';
// import SimpleStorage from "./contracts/SimpleStorage.json";
// import Web3 from "web3";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { storeConfig, persistor } from './store/storeConfigure';
import { PersistGate } from 'redux-persist/integration/react';
import ResponsiveHeaderBar from "./Components/DisplayElements/Header/Header.jsx";
import ErrorPage from "./Routes/ErrorPage";
import Proposals from "./Components/Proposals/Proposals";
import ProposalDetailView from "./Components/Proposals/ProposalDetailView";
import CreateBudget from './Components/pages/Budgets/CreateBudget.jsx';
import InvoiceListView from './Components/pages/Invoices/InvoiceListView';
import InvoiceCreation from './Components/pages/Invoices/InvoiceCreation';
import theme from "./styles/theme";

function App() {

  // const [state, setState] = useState({
  //   web3: null,
  //   contract: null,
  // });
  // const [data, setData] = useState("nill");
  // useEffect(() => {
  //   const provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");

  //   async function template() {
  //     const web3 = new Web3(provider);
  //     const networkId = await web3.eth.net.getId();
  //     const deployedNetwork = SimpleStorage.networks[networkId];
  //     const contract = new web3.eth.Contract(
  //       SimpleStorage.abi,
  //       deployedNetwork.address
  //     );
  //     console.log(contract);
  //     setState({ web3: web3, contract: contract });
  //   }
  //   provider && template();
  // }, []);
  // useEffect(() => {
  //   const { contract } = state;
  //   async function readData() {
  //     const data = await contract.methods.getter().call();
  //     setData(data);
  //   }
  //   contract && readData();
  // }, [state]);
  // async function writeData() {
  //   const { contract } = state;
  //   const data = document.querySelector("#value").value;
  //   await contract.methods
  //     .setter(data)
  //     .send({ from: "0x1f4F90f9aA5779f2C1E190133C2c872944bDED1c" });
  //   window.location.reload();
  // }

  // const snapShotClient = new ApolloClient({
  //   uri: 'http://localhost:8000/graphql',
  //   cache: new InMemoryCache()
  // });

  // const client = new ApolloClient({
  //   uri: 'https://hub.snapshot.org/graphql',
  //   cache: new InMemoryCache(),
  // });

  // const client = new ApolloClient({
  //   uri: concat(client.uri, snapshotClient.uri),
  //   cache: new InMemoryCache().restore(),
  // });
  const httpLink = createHttpLink({
    uri: 'http://localhost:8000/graphql',
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message }) => {
        console.log(message);
      });
    }
    if (networkError) {
      console.log(`Network Error: ${networkError}`);
    }
  });

  const client = new ApolloClient({
    link: errorLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return (
  
        <ApolloProvider client={client}>
          <Provider store={ storeConfig }>
            <PersistGate loading={null} persistor={persistor}>
              <BrowserRouter>
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
                  <Route element={<ErrorPage />} />
                </Routes>
              </BrowserRouter>
            </PersistGate>
          </Provider>
        </ApolloProvider>
  );
}

export default App;
