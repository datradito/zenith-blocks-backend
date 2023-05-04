import './App.css';
import React from 'react';
import { useState, useEffect } from "react";
// import SimpleStorage from "./contracts/SimpleStorage.json";
// import Web3 from "web3";
import { Mainnet, DAppProvider, ChainId, useEtherBalance, useEthers, Config, Goerli } from '@usedapp/core'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Root from "./Routes/Root";


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


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Proposals />
        },
        {
          path: "/proposals",
          element: <Proposals />
        },
        {
          path: "/proposals/:proposalId",
          element: <ProposalDetailView />
        }
      ]
    },
    {
      path: "/proposals/:proposalId",
      element: <ProposalDetailView />,
    },
    {
      path: "/proposals",
      element: <Proposals />
    },
    {
      path: "/proposal/budgets/:proposalId",
      element: <CreateBudget />
    }
  ]);
  return (
    <DAppProvider config={{ supportedChains: [ChainId.Kovan] }}>
      <ApolloProvider client={client}>
        <RouterProvider router={router} />
      </ApolloProvider>
    </DAppProvider>
  );
}

export default App;
