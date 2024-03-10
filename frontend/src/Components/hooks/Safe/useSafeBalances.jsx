import { useState, useEffect } from "react";
import getSafeBalances from "../../../Services/Safe/getSafeBalances";

//returns all fiat balances over 0 usd

function useSafeBalances(safesAddress, chainId) {
  const [assets, setAssets] = useState([]);
  const [loaded, setLoaded] = useState(false);

    console.log(chainId)
    
  useEffect(() => {
      async function loadBalances() {
        if (!safesAddress) return;
      const balances = await getSafeBalances(safesAddress, chainId);
      setAssets(
        balances.filter((item) => parseInt(item.fiatBalance) > 0)
      );
      setLoaded(true);
    }

    loadBalances();
  }, [safesAddress, chainId]);

  return [assets, loaded];
}

export { useSafeBalances };
