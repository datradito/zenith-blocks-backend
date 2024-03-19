// SafeContext.js
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback
} from "react";
import Safe, { EthersAdapter } from "@safe-global/protocol-kit";
import { ethers } from "ethers";
import SafeApiKit from "@safe-global/api-kit";
import useSafeStore from "../../store/modules/safe/index.ts";
import CircularIndeterminate from "../../Components/atoms/Loader/loader.jsx";

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
  const { safeSelected, chainId } = useSafeStore();

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

  if (!service) {
    return <CircularIndeterminate />; // Or a loading spinner
  }

  const state = {
    safeSdk,
    service,
    provider: getProvider(),
    safeSelected,
    chainId,
  };

  return <SafeContext.Provider value={state}>{children}</SafeContext.Provider>;
};

