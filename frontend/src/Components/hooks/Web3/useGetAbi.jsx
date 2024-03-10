import { useState, useEffect } from "react";
import { getTokenContractAddress } from "../../../utils/TokenContracts/tokenConfig"
import { useAccount } from "wagmi";
import fetchContractABI from "../../../utils/TokenContracts/fetchContractABI";

const useGetAbi = (ticker) => {
  const [contractABI, setContractABI] = useState(null);
  const { chain } = useAccount();
  const contractAddress = getTokenContractAddress(chain?.id, ticker);
  
  useEffect(() => {
    const fetchABI = async () => {
      try {
        const abi = await fetchContractABI(contractAddress, chain?.id);
        setContractABI(abi);
      } catch (error) {
        console.error(error);
      }
    };

    fetchABI();
  }, [ticker, contractAddress, chain?.id]);

  return { contractABI, contractAddress };
};

export default useGetAbi;


