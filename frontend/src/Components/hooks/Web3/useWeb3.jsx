import { useState, useEffect, useMemo } from "react";
import Web3 from "web3";

const useWeb3 = () => {
  const [web3Instance, setWeb3Instance] = useState(null);
  const infuraUrl =
    "https://mainnet.infura.io/v3/354ff94af0b7439999ea30a8a1dde432";

  useEffect(() => {
    const loadWeb3 = async () => {
      try {
        const web3 = new Web3(infuraUrl);
        setWeb3Instance(web3);
      } catch (error) {
        console.error("Error initializing Web3:", error);
        // Optionally handle error here, like setting a flag or showing a message
      }
    };

    loadWeb3();
  }, []);

  // Optionally memoize the Web3 instance
  const web3 = useMemo(() => web3Instance, [web3Instance]);

  return web3;
};

export default useWeb3;
