// SafeContext.js
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import usePolling from "../../Components/hooks/Safe/usePolling.jsx";

import Safe, { EthersAdapter } from "@safe-global/protocol-kit";
import { ethers } from "ethers";
import SafeApiKit from "@safe-global/api-kit";
import useSafeStore from "../../store/modules/safe/index.ts";
import CircularIndeterminate from "../../Components/atoms/Loader/loader.jsx";
import getChain from "./getChain.js";
import { getERC20Info } from "./getERC20Info.js";

const initialState = {
  safeSdk: null,
  service: null,
  provider: null,
};

export const SafeContext = createContext(initialState);

export const useSafeProvider = () => {
  const context = useContext(SafeContext);
  if (!context) {
    throw new Error("useSafeProvider should be used within a Safe Provider");
  }

  return context;
};

export const SafeProvider = ({ children }) => {
  const [service, setService] = useState(null);
  const [safeSdk, setSafeSdk] = useState(null);
  const {
    safeSelected,
    chainId,
    tokenAddress,
    setTokenAddress,
    setErc20Balances,
    setSafeBalance
  } = useSafeStore();

  const getProvider = useCallback(() => {
    if (!window.ethereum) {
      // Handle this case appropriately
      console.error("Ethereum provider not found");
      return null;
    }
    return new ethers.BrowserProvider(window.ethereum);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const provider = await getProvider();
        const signer = await provider?.getSigner(0);

        const ethAdapter = new EthersAdapter({
          ethers,
          signerOrProvider: signer,
        });
        const safe = await Safe.create({
          ethAdapter,
          safeAddress: safeSelected,
        });

        setSafeSdk(safe);
        console.log("Safe SDK initialized");
      } catch (error) {
        // Handle this error appropriately
        console.error("Failed to initialize safeSdk", error);
      }
    })();
  }, [getProvider, safeSelected]);

  useEffect(() => {
    (async () => {
      if (!chainId) return;
      try {
        console.log(chainId);
        const apiKit = new SafeApiKit({ chainId });
        setService(apiKit);
      } catch (error) {
        console.error("Failed to initialize service", error);
      }
    })();
  }, [chainId]);

  const fetchSafeBalance = useCallback(async () => {
    if(!safeSelected) return;
    const provider = getProvider();
    const balance = await provider?.getBalance(safeSelected);

    setSafeBalance(balance?.toString());
    return balance?.toString();
  }, [safeSelected]);

  const safeBalance = usePolling(fetchSafeBalance);

  // fetch safe's ERC20 balances
  const fetchErc20SafeBalances = useCallback(async () => {
    const provider = getProvider();
    if (!provider) {
      return {};
    }
    const chain = getChain(chainId);

    const tokens = await Promise.all(
      chain.supportedErc20Tokens?.map((erc20Address) =>
        getERC20Info(erc20Address, provider, safeSelected)
      ) || []
    ).then((tokens) =>
      tokens.reduce(
        (acc, token) => (!!token ? { ...acc, [token.address]: token } : acc),
        {}
      )
    );

    const handleBigInt = (key, value) =>
      typeof value === "bigint" ? value.toString() : value;

    console.log(tokens)
    setErc20Balances(JSON.stringify(tokens, handleBigInt));
    return tokens;
  }, [safeSelected, chainId]);

  const erc20Balances = usePolling(fetchErc20SafeBalances);
  const erc20token = erc20Balances?.[tokenAddress];


  if (!service) {
    return <CircularIndeterminate />; // Or a loading spinner
  }

  const state = {
    safeSdk,
    service,
    safeSelected,
    chainId,
    safeBalance,
    erc20Balances,
    setTokenAddress,
    tokenAddress,
  };

  return <SafeContext.Provider value={state}>{children}</SafeContext.Provider>;
};
