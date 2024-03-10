import { useState, useEffect } from "react";
import Safe, { EthersAdapter } from "@safe-global/protocol-kit";
import { ethers } from "ethers";
import { message } from "antd";

function useSafeSdk(safeAddress) {

  const [ethAdapter, setEthAdapter] = useState(null);
  const [safeSdk, setSafeSdk] = useState(null);

  useEffect(() => {
    async function initialize() {
      if (!safeAddress) {
        message.error("Something went wrong, please re-connect safe");
        return;
      };

      const provider = new ethers.BrowserProvider(window.ethereum);

      let adapter = ethAdapter;
      if (ethAdapter === null) {
        adapter = new EthersAdapter({
          ethers,
          signerOrProvider: provider,
        });
        setEthAdapter(adapter);
      }

      const safe = await Safe.create({
        ethAdapter: adapter,
        safeAddress,
      });

      setEthAdapter(adapter);
      setSafeSdk(safe);
    }

    initialize();

    return () => {
      // Cleanup if needed
    };
  }, [safeAddress]);

  return { safeSdk };
}

export default useSafeSdk;
