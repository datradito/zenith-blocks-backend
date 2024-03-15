// import { ethers } from "ethers";
// import { getTransferTransaction } from "./getTransferTransaction";


// const createBatchTransaction = async (data) => {

//   if (!data) {
//     console.error(`Missing required data for batch transaction`, { data });
//     return;
//   }

//   const transactions = data.map((tx) => {
//     const recipient = tx.recipient.address;
//     const currencyAddress = tx.currency.address;
//     //const amount = ethers.parseUnits(tx.amount, tx.currency.decimals).toString();
//     return getTransferTransaction(tx.amount, recipient, currencyAddress);
//   });

//   return transactions;
// };

// const transferFunds = async (data, transactionService, sender) => {
//   const transactions = await createBatchTransaction(data);
//   if (!transactions) {
//     console.error(`Failed to create transactions for batch transfer`);
//     return;
//   }
//   const nonce = await transactionService.getNextNonce();

//   const options = {
//     // safeTxGas, // Optional
//     // baseGas, // Optional
//     // gasPrice, // Optional
//     // gasToken, // Optional
//     // refundReceiver, // Optional
//     nonce: nonce, // Optional
//   };

//   const {safeTransaction, safeTxHash, senderSignature } = await transactionService.createTransaction(transactions, options);

//   try {
//     await transactionService.proposeTransaction(safeTransaction,safeTxHash,senderSignature, sender);
//   } catch (error) {
//     console.error("Error proposing transaction:", error);
//   }
// };

// export { transferFunds };


import { ethers } from "ethers";
import { getTransferTransaction } from "./getTransferTransaction";

interface TransactionData {
  recipient: {
    address: string,
  };
  currency: {
    address: string,
    decimals: number,
  };
  amount: string;
}

interface TransactionService {
  getNextNonce: () => Promise<number>;
  createTransaction: (
    transactions: string[],
    options: any
  ) => Promise<{
    safeTransaction: any,
    safeTxHash: string,
    senderSignature: string,
  }>;
  proposeTransaction: (
    safeTransaction: any,
    safeTxHash: string,
    senderSignature: string,
    sender: string
  ) => Promise<void>;
}

const createBatchTransaction = async (
  data: TransactionData[]
): Promise<{ to: string; value: string; data: string }[]> => {
  if (!data) {
    console.error(`Missing required data for batch transaction`, { data });
    return [];
  }

  const transactions = data.map((tx) => {
    const recipient = tx.recipient.address;
    const currencyAddress = tx.currency.address;
    return getTransferTransaction(tx.amount, recipient, currencyAddress);
  });

  return transactions;
};

const transferFunds = async (
  data: TransactionData[],
  transactionService: TransactionService,
  sender: string
): Promise<void> => {
  const transactions = await createBatchTransaction(data);
  if (!transactions) {
    console.error(`Failed to create transactions for batch transfer`);
    return;
  }
  const nonce = await transactionService.getNextNonce();

  const options = {
    nonce: nonce,
  };

  const transactionStrings = transactions.map((tx) => JSON.stringify(tx));

  const { safeTransaction, safeTxHash, senderSignature } =
    await transactionService.createTransaction(transactionStrings, options);

  try {
    await transactionService.proposeTransaction(
      safeTransaction,
      safeTxHash,
      senderSignature,
      sender
    );
  } catch (error) {
    console.error("Error proposing transaction:", error);
  }
};

export { transferFunds };
