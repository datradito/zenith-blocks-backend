import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import SafeApiKit from "@safe-global/api-kit";
import Safe, { SafeFactory, EthersAdapter } from "@safe-global/protocol-kit";
import getChain from "../../Services/Safe/getChain";
import { getERC20Info } from "../../Services/Safe/getERC20Info";
import { initialChain } from "../../Constants/chains";

import usePolling from "../../Components/hooks/Safe/usePolling";
import { message } from "antd";


const initialState = {
  isAuthenticated: false,
  erc20token: {},
  erc20Balances: {},
  loginWeb3Auth: () => {},
  logoutWeb3Auth: () => {},
  relayTransaction: async () => {},
  setChainId: () => {},
  setSafeSelected: () => {},
  setTokenAddress: () => {},
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
  const [safeSelected, setSafeSelected] = useState(null);
  const [hasLoadedSafes, setHasLoadedSafes] = useState(false);
  const [tokenAddress, setTokenAddress] = useState(ethers.ZeroAddress);
  const [chainId, setChainId] = useState(connectedChain?.id);
  const [web3Provider, setWeb3Provider] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [protocolKit, setProtocolKit] = useState();
  const [apiKit, setApiKit] = useState(null);
  const [ethAdapter, setEthAdapter] = useState();
  const [chain, setChain] = useState(getChain(chainId || connectedChain?.id));

  useEffect(() => {
    if (connectedChain?.id) {
      setChainId(connectedChain.id);
    }

    setChain(getChain(connectedChain.id));
  }, [connectedChain]);

  useEffect(() => {
    if (safeSelected) {
      localStorage.setItem("selectedSafe", safeSelected);
    }
  }, [safeSelected]);

  // When the component mounts, retrieve the selectedSafe from localStorage
  useEffect(() => {
    const storedSafe = localStorage.getItem("selectedSafe");
    if (storedSafe) {
      setSafeSelected(storedSafe);
    }
  }, []);

  useEffect(() => {
    setOwnerAddress("");
    setSafes([]);
    setChainId(connectedChain?.id);
    setWeb3Provider(undefined);
    setSafeSelected("");
    setApiKit(null);
    setHasLoadedSafes(false);
  }, [chain, address]);

  //set safe api kit
  useEffect(() => {
    // Initialize the safeApiKit when the component mounts
    const initializeSafeApiKit = async () => {
      const newSafeApiKit = new SafeApiKit({ chainId: chainId });
      setApiKit(newSafeApiKit);
    };

    initializeSafeApiKit();
    return () => {
      setApiKit(null);
    };
  }, [chainId, address]);

  //set safe protocol kit
  useEffect(() => {
    const initializeProtocolKit = async () => {
      if (protocolKit) {
        return;
      }
      // const safeFactory = await SafeFactory.create({ ethAdapter })

      const safeSdk = await Safe.create({
        ethAdapter,
        safeAddress: safeSelected,
      });
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
      setWeb3Provider(provider);
      setEthAdapter(ethAdapter);
    };

    initializeEthAdapter();
  }, []);

  const getSafesOwned = async () => {
    try {
      if (!apiKit) {
        throw new Error("apiKit is not initialized");
      }
      const safes = await apiKit.getSafesByOwner(address);
      setOwnerAddress(address);
      setSafes(safes?.safes);
      localStorage.setItem("safes", JSON.stringify(safes.safes));
      localStorage.setItem("selectedSafe", safes.safes[0]);
      setSafeSelected(safes.safes[0]);
      setIsAuthenticated(true);
    } catch (error) {
      message.error(`Error fetching safes: ${error.message}`);
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

  // fetch safe's ERC20 balances
  const fetchErc20SafeBalances = useCallback(async () => {
    if (!web3Provider) {
      return {};
    }
    return Promise.all(
      chain.supportedErc20Tokens?.map((erc20Address) =>
        getERC20Info(erc20Address, web3Provider, safeSelected)
      ) || []
    ).then((tokens) =>
      tokens.reduce(
        (acc, token) => (!!token ? { ...acc, [token.address]: token } : acc),
        {}
      )
    );
  }, [web3Provider, safeSelected, chain]);

  const erc20Balances = usePolling(fetchErc20SafeBalances);
  const erc20token = erc20Balances?.[tokenAddress];

  const state = {
    ownerAddress,
    chainId,
    chain,
    safes,
    erc20token,
    erc20Balances,
    tokenAddress,
    safeSelected,
    hasLoadedSafes,
    apiKit,

    isAuthenticated,
    web3Provider,
    logoutWeb3Auth,
    setChainId,
    setHasLoadedSafes,
    setTokenAddress,
    setSafeSelected,
    getSafesOwned,
  };

  return (
    <AccountContext.Provider value={state}>{children}</AccountContext.Provider>
  );
};

export { useAccountAbstraction, AccountAbstractionProvider };
