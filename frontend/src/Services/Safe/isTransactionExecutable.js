const isTransactionExecutable = (
  safeThreshold,
  transaction
) => {
  return transaction.confirmations.length >= safeThreshold;
};

export { isTransactionExecutable };