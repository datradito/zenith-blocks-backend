import { ethers } from "ethers";
import { getTransferTransaction } from "./getTransferTransaction";


const createBatchTransaction = async (data) => {

  if (!data) {
    console.error(`Missing required data for batch transaction`, { data });
    return;
  }

  const transactions = data.map((tx) => {
    const recipient = tx.recipient.address;
    const currencyAddress = tx.currency.address;
    //const amount = ethers.parseUnits(tx.amount, tx.currency.decimals).toString();
    return getTransferTransaction(tx.amount, recipient, currencyAddress);
  });

  return transactions;
};

const transferFunds = async (data, transactionService, sender) => {
  const transactions = await createBatchTransaction(data);
  if (!transactions) {
    console.error(`Failed to create transactions for batch transfer`);
    return;
  }
  const nonce = await transactionService.getNextNonce();

  const options = {
    // safeTxGas, // Optional
    // baseGas, // Optional
    // gasPrice, // Optional
    // gasToken, // Optional
    // refundReceiver, // Optional
    nonce: nonce, // Optional
  };

  console.log(options)
  const {safeTransaction, safeTxHash, senderSignature } = await transactionService.createTransaction(transactions, options);

  try {

    console.log( safeTxHash)
    await transactionService.proposeTransaction(safeTransaction, safeTxHash, senderSignature, sender);
    return safeTxHash;
  } catch (error) {
    console.error("Error proposing transaction:", error);
  }
};

export { transferFunds };
