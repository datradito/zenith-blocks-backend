import { useState, useEffect } from "react";
import Web3 from "web3";

const useWeb3 = () => {
  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    const loadWeb3 = async () => {

      const web3 = new Web3(
        "https://mainnet.infura.io/v3/354ff94af0b7439999ea30a8a1dde432"
      );

      setWeb3(web3);
    };

    loadWeb3();
  }, []);

  return web3;
};

export default useWeb3;
