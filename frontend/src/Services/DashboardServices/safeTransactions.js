//write this utility class which takes a transaction, based on if transaction is type of Safe, ERc20 it sanitizes the inputand returns more universal object which can then be used as same throught the component
// Compare this snippet from frontend/src/Utility/SampleTransaction.json:
//my end goal is to get transaction which has its type, its status, if executed, or successful, its from and to addresses, created date, if its token transferred then token info, its value
class SafeTransactionsService {
  constructor(transaction) {
    this.transaction = transaction;
  }

  sanitizeTransaction() {
    let from,
      to,
      value,
      tokenInfo,
      transfers,
      executionDate,
      txHash,
      transactionType,
      createdDate;

    if (this.transaction.txType === "MULTISIG_TRANSACTION") {
      from = this.transaction.proposer;
      to = this.transaction.to;
      value = this.transaction.value;

      createdDate = this.transaction.submissionDate;
      executionDate = this.transaction.executionDate;

      txHash = this.transaction.safeTxHash;
      transactionType = "Safe";
    } else if (this.transaction.txType === "ETHEREUM_TRANSACTION") {
      from = this.transaction.from;
      to = this.transaction.to;
      value = this.transaction.value;
      createdDate = this.transaction.executionDate;
      executionDate = this.transaction.executionDate;
      txHash = this.transaction.txHash;
      transactionType = "ERC20";
      transfers = this.transaction.transfers.map((transfer) => {
        return {
          type: transfer.type,
          executionDate: transfer.executionDate,
          blockNumber: transfer.blockNumber,
          transactionHash: transfer.transactionHash,
          to: transfer.to,
          value: transfer.value,
          tokenId: transfer.tokenId,
          tokenAddress: transfer.tokenAddress,
          transferId: transfer.transferId,
          tokenInfo: transfer.tokenInfo,
          from: transfer.from,
        };
      });
      tokenInfo =
        this.transaction.transfers.length > 0
          ? {...this.transaction.transfers[0].tokenInfo, value: this.transaction.transfers[0].value}
          : null;
    }

    const sanitizedTransaction = {
      type: transactionType,
      status: this.transaction.isSuccessful
        ? "Successful"
        : this.transaction.isExecuted
        ? "Executed"
        : this.transaction.executionDate ? "Success" : "Failed",
      createdDate: createdDate,
      executionDate: executionDate,
      from: from,
      to: to,
      value: value,
      tokenInfo: tokenInfo,
      transfers: transfers,
      txHash: txHash,
    };

    return sanitizedTransaction;
  }
}

export default SafeTransactionsService;
