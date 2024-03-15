import { useEffect, useState } from "react";

import useSafeStore from "../../../store/modules/safe/index.ts";
import useSafeSdk from "./useSafeSdk";
import SafeApiKit from "@safe-global/api-kit";

function useSafeTransaction() {
  const { safeSelected, chainId } = useSafeStore();

  const { safeSdk } = useSafeSdk(safeSelected);
  const [transactionHash, setTransactionHash] = useState(null);
  const [service, setService] = useState(null);
  const [signature, setSignature] = useState(null);
  const [safeTransaction, setSafeTransaction] = useState(null);

  useEffect(() => {
    if (safeSelected) {
      const apiKit = new SafeApiKit({ chainId: chainId });
      setService(apiKit);
    }
  }, [safeSelected, chainId]);

  const createTransaction = async (transactions, options) => {
    try {
      const safeTransaction = await safeSdk.createTransaction({
        transactions,
        options,
      });
      console.log(safeTransaction)
      setSafeTransaction(safeTransaction);
      const safeTxHash = await getTransactionHash(safeTransaction);
      const senderSignature = await signHash(safeTxHash);

      setTransactionHash(safeTxHash);
      setSignature(senderSignature);

      return { safeTransaction, safeTxHash, senderSignature };
    } catch (error) {
      console.error("Error creating transaction:", error);
      throw error;
    }
  };

  const proposeTransaction = async (
    safeTransaction,
    transactionHash,
    signature,
    senderAddress
  ) => {
    try {
      await service.proposeTransaction({
        safeAddress: safeSelected,
        safeTransactionData: safeTransaction.data,
        safeTxHash: transactionHash,
        senderAddress,
        signature: signature.data,
      });
    } catch (error) {
      console.error("Error proposing transaction:", error);
      throw error;
    }
  };

  const getNextNonce = async () => {
    return await service.getNextNonce(safeSelected);
  };

  const confirmTransaction = async (hash, signature) => {
    return await service.confirmTransaction(hash, signature);
  };

  const getTransactionHash = async (safeTransaction) => {
    try {
      return await safeSdk.getTransactionHash(safeTransaction);
    } catch (error) {
      console.error("Error getting transaction hash:", error);
      throw error;
    }
  };

  const signHash = async (hash) => {
    return await safeSdk.signHash(hash);
  };

  const isTxExecutable = async (safeTransaction) => {
    const isTxExecutable = await safeSdk.isValidTransaction(safeTransaction);

    if (isTxExecutable) {
      const txResponse = await service.executeTransaction(safeTransaction);
      const contractReceipt = await txResponse.transactionResponse?.wait();

      console.log("Transaction executed.");
      console.log("- Transaction hash:", contractReceipt?.transactionHash);
    } else {
      console.log(
        "Transaction invalid. Transaction was not executed.",
        isTxExecutable
      );
    }
  };

  const getTransaction = async (safeTxHash) => {
    return await service.getTransaction(safeTxHash);
  };

  const confirmTransactionWithHash = async (safeTxHash) => {
    const signature = await signHash(safeTxHash);
    return await service.confirmTransaction(safeTxHash, signature.data);
  };

  return {
    transactionHash,
    signature,
    createTransaction,
    proposeTransaction,
    getNextNonce,
    confirmTransaction,
    isTxExecutable,
    getTransaction,
    confirmTransactionWithHash,
    safeTransaction,
  };
}

export default useSafeTransaction;
