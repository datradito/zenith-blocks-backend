import { useCallback } from "react";
import { useWalletClient } from "wagmi";

export default function useHandleTransfer() {
    const { data: walletClient, isError, isLoading } = useWalletClient();
    
    return useCallback((transactionConfig) => {
      if (isError) {
        return {
          error: {
            shortMessage: "Error: Wallet client not found",
          },
        };
      }
        if (isLoading) {
            return {
            error: {
                shortMessage: "Error: Wallet client is loading",
            },
            };
        }

      
      return walletClient.writeContract({
      address: transactionConfig.contractAddress,
      abi: transactionConfig.contractABI,
      functionName: "transfer",
      args: [transactionConfig.address, transactionConfig.amount],
    });
  }, [walletClient]);
}
