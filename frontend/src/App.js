import './App.css';
import React from 'react';
// import SimpleStorage from "./contracts/SimpleStorage.json";
// import Web3 from "web3";
import {  DAppProvider, ChainId} from '@usedapp/core'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { storeConfig, persistor } from './store/storeConfigure';
import { PersistGate } from 'redux-persist/integration/react';
import Root from "./Routes/Root";
import ResponsiveHeaderBar from "./Components/DisplayElements/Header/Header.jsx";
import ErrorPage from "./Routes/ErrorPage";
import Proposals from "./Components/Proposals/Proposals";
import ProposalDetailView from "./Components/Proposals/ProposalDetailView";
import CreateBudget from './Components/pages/Budgets/CreateBudget';

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

  const client = new ApolloClient({
    uri: 'https://hub.snapshot.org/graphql',
    cache: new InMemoryCache(),
  });


  return (
  
    <DAppProvider config={{ supportedChains: [ChainId.Kovan] }}>
        <ApolloProvider client={client}>
          <Provider store={ storeConfig }>
            <PersistGate loading={null} persistor={persistor}>
              <BrowserRouter>
                <ResponsiveHeaderBar />
                <Routes>
                  <Route exact path="/proposals" element={<Proposals />} />
                  <Route exact path="/proposals/:proposalId" element={<ProposalDetailView />} />
                  <Route exact path="/proposal/budgets/:proposalId" element={<CreateBudget />} />
                  <Route element={<ErrorPage />} />
                </Routes>
              </BrowserRouter>
            </PersistGate>
          </Provider>
        </ApolloProvider>
      </DAppProvider>
  );
}

export default App;
