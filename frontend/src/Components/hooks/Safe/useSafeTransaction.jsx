import { useState } from "react";

import SafeApiKit from "@safe-global/api-kit";
import { useSafeProvider } from "../../../Services/Safe/SafeProvider.jsx";

function useSafeTransaction() {
  const { safeSdk, service, safeSelected, chainId } = useSafeProvider();
  const [transactionHash, setTransactionHash] = useState(null);
  const [signature, setSignature] = useState(null);
  const [safeTransaction, setSafeTransaction] = useState(null);

  const createTransaction = async (transactions, options) => {
    try {
      const safeTransaction = await safeSdk.createTransaction({
        transactions,
        options,
      });
      setSafeTransaction(safeTransaction);
      console.log(safeTransaction);
      const safeTxHash = await getTransactionHash(safeTransaction);
      console.log(safeTxHash);
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
    // const transactionConfig: ProposeTransactionProps = {
    //   safeAddress,
    //   safeTxHash,
    //   safeTransactionData,
    //   senderAddress,
    //   senderSignature,
    //   origin,
    // };
    try {
      console.log(safeTransaction);
      console.log(transactionHash);
      console.log(signature);

      await service.proposeTransaction({
        safeAddress: safeSelected,
        safeTransactionData: safeTransaction.data,
        safeTxHash: transactionHash,
        senderAddress,
        senderSignature: signature.data,
      });
      // await service.proposeTransaction({
      //   safeAddress: safeSelected,
      //   safeTxHash: transactionHash,
      //   safeTransactionData: safeTransaction.data,
      //   senderAddress,
      //   senderSignature: signature.data,
      // });
    } catch (error) {
      console.log("Error proposing transaction:", error);
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
    // if (!safeSdk) {
    //   await refreshSafeSdk();
    // }
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
    console.log(!service);
    if (!service) {
      const apiKit = new SafeApiKit({ chainId: chainId });
      return await apiKit.getTransaction(safeTxHash);
    } else {
      return await service.getTransaction(safeTxHash);
    }
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
