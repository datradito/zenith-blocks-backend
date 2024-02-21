import React, { createContext, useContext, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import SafeApiKit from "@safe-global/api-kit";
import Safe, { SafeFactory, EthersAdapter } from "@safe-global/protocol-kit";
import getChain from "../../Services/Safe/getChain";
import { initialChain } from "../../Constants/chains";

const initialState = {
  isAuthenticated: false,
  loginWeb3Auth: () => {},
  logoutWeb3Auth: () => {},
  relayTransaction: async () => {},
  setChainId: () => {},
  setSafeSelected: () => {},
  setTokenAddress: () => {},
  onRampWithStripe: async () => {},
  safes: [],
  tokenAddress: ethers.ZeroAddress,
  chainId: initialChain.id,
};


const AccountContext = createContext(initialState);

const useAccountAbstraction = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error(
      "useAccountAbstraction should be used within a AccountAbstraction Provider"
    );
  }
  return context;
};

const AccountAbstractionProvider = ({ children }) => {
  const { chain: connectedChain, address } = useAccount();
  const [ownerAddress, setOwnerAddress] = useState("");
  const [safes, setSafes] = useState([]);
  const [safeSelected, setSafeSelected] = useState(
    localStorage.getItem("selectedSafe") || ""
  );

  const [tokenAddress, setTokenAddress] = useState(ethers.ZeroAddress);
  const [chainId, setChainId] = useState(connectedChain?.id);
  const [web3Provider, setWeb3Provider] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [ protocolKit, setProtocolKit ] = useState();
  const [apiKit, setApiKit] = useState(null);
  const [ethAdapter, setEthAdapter] = useState();

  const chain = getChain(chainId) || connectedChain?.id;

  useEffect(() => {
    setOwnerAddress("");
    setSafes([]);
    setChainId(chain.id);
    setWeb3Provider(undefined);
    setSafeSelected("");
  }, [chain]);

  //set safe api kit
  useEffect(() => {
    const initializeApiKit = async () => {
      if (apiKit) {
        return;
      }

      setChainId(connectedChain.id);
      const safeApiKit = new SafeApiKit({ chainId: chainId });
      setApiKit(safeApiKit);
    };

    initializeApiKit();
  }, []);

  //set safe protocol kit
  useEffect(() => {
    const initializeProtocolKit = async () => {
      if (protocolKit) {
        return;
      }
      // const safeFactory = await SafeFactory.create({ ethAdapter })

      const safeSdk = await Safe.create({ ethAdapter, safeAddress: safeSelected })
      setProtocolKit(safeSdk);
    };
    if (safeSelected) {
      initializeProtocolKit();
    }
  }, [safeSelected]);
  useEffect(() => {
    const initializeEthAdapter = async () => {
      // const web3Provider = new Web3.providers.HttpProvider(
      //   `https://sepolia.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`
      // );
      const provider = new ethers.BrowserProvider(window.ethereum);

      const ethAdapter = new EthersAdapter({
        ethers,
        signerOrProvider: await provider.getSigner(0),
      });
      setEthAdapter(ethAdapter);
    };

    initializeEthAdapter();
  }, []);

  const getSafesOwned = async () => {
    try {
      if (!apiKit) {
        return;
      }
      const safes = await apiKit.getSafesByOwner(address);
      setOwnerAddress(address);
      setSafes(safes.safes || []);
      localStorage.setItem("safes", JSON.stringify(safes.safes));
      const defaultSafe = localStorage.setItem("selectedSafe", safes.safes[0])
      setSafeSelected(defaultSafe);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error fetching safes:", error);
    }
  };

  const logoutWeb3Auth = () => {
    setApiKit(undefined);
    setOwnerAddress("");
    setSafes([]);
    setChainId(connectedChain?.id);
    setWeb3Provider(undefined);
    setIsAuthenticated(false);
    localStorage.removeItem("safes");
    localStorage.removeItem("selectedSafe");
  };

  const state = {
    ownerAddress,
    chainId,
    chain,
    safes,
    tokenAddress,
    isAuthenticated,
    web3Provider,
    logoutWeb3Auth,
    setChainId,
    setTokenAddress,
    setSafeSelected,
    getSafesOwned,
  };

  return (
    <AccountContext.Provider value={state}>{children}</AccountContext.Provider>
  );
};

export { useAccountAbstraction, AccountAbstractionProvider };
