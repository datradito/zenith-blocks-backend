const isTransactionSignedByAddress = (
  signerAddress,
  transaction
) => {
  const confirmation = transaction.confirmations.find(
    (confirmation) => confirmation.owner === signerAddress
  );
  return !!confirmation;
};

export { isTransactionSignedByAddress };