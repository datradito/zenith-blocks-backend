import { useCallback } from "react";
import { useWalletClient } from "wagmi";

/**
 * Initiates a token transfer transaction using the connected wallet client.
 * 
 * @param {Object} transferConfig - The transfer config object
 * @param {string} transferConfig.contractAddress - The contract address 
 * @param {Object} transferConfig.contractABI - The contract ABI
 * @param {string} transferConfig.recipient - The recipient address
 * @param {string} transferConfig.amount - The transfer amount 
 * @returns {Promise} - Promise that resolves to the transaction result or rejects with an error
 */
export default function useHandleTransfer(transferConfig) {

  const { data: walletClient, isError, isLoading } = useWalletClient();

  return useCallback(async (transferConfig) => {

    if (isError) {
      return {
        error: {
          shortMessage: "Error: Wallet client not found"
        }
      };
    }

    if (isLoading) {
      return {
        error: {
          shortMessage: "Error: Wallet client is loading"
        }
      };
    }

    if (!transferConfig.contractAddress || !transferConfig.contractABI) {
      return {
        error: {
          shortMessage: "Required transfer config fields missing"
        }
      }
    }

    try {
      return await walletClient.writeContract({
        address: transferConfig.contractAddress,
        abi: transferConfig.contractABI,
        functionName: "transfer",
        args: [transferConfig.address, transferConfig.amount * 10 ** 6],
        gas: process.env.REACT_APP_GAS_LIMIT,
      });
    } catch (error) {
      return {
        error: {
          shortMessage: error.message
        }
      };
    }

  }, [isError, isLoading, walletClient]);

}
