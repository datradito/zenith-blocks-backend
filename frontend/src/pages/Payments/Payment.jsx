import React, { useState, useEffect, useMemo } from "react";
import { Button, Tooltip } from "antd";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import useSafeTransaction from "../../Components/hooks/Safe/useSafeTransaction.jsx";
import useAuthStore from "../../store/modules/auth/index.ts";
import useSafeStore from "../../store/modules/safe/index.ts";
import Label from "../../Components/atoms/Label/Label.jsx";
import BillConfirmations from "../../Components/features/bills/BillConfirmations.jsx";
import BillExecute from "../../Components/features/payments/BillExecute.jsx";

const Payment = ({ txHash }) => {
  const { getTransaction, confirmTransactionWithHash, isTxExecutable } =
    useSafeTransaction();
  const {
    user: { address },
  } = useAuthStore();
  const { safeOwners } = useSafeStore();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransaction = async () => {
      if (!txHash) {
        setLoading(false);
        return;
      }
      try {
        const tx = await getTransaction(txHash);
        setTransaction(tx);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchTransaction();
  }, [txHash]);

  const handleSignTransaction = async () => {
    try {
      if (!transaction) return;
      await confirmTransactionWithHash(txHash);
    } catch (err) {
      setError(err);
    }
  };

  const handleExecute = async () => {
    try {
      if (transaction) await isTxExecutable(transaction);
    } catch (err) {
      setError(err);
    }
  };

  const signedByCurrentUser = useMemo(() => {
    if (
      !txHash ||
      !transaction ||
      !Array.isArray(transaction.confirmations) ||
      typeof address !== "string"
    ) {
      return false;
    }
    return transaction.confirmations.some(
      (confirmation) =>
        confirmation.owner.toLowerCase() === address.toLowerCase()
    );
  }, [address, transaction, txHash]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {transaction && <BillConfirmations transaction={transaction} />}
      {signedByCurrentUser ? (
        <Label>You have already signed this transaction</Label>
      ) : (
        <Button onClick={handleSignTransaction}>Sign</Button>
      )}
      {transaction &&
        safeOwners.map((owner) => {
          if (owner !== address) {
            const isSigned = transaction.confirmations.some(
              (confirmation) =>
                confirmation.owner.toLowerCase() === owner.toLowerCase()
            );
            return (
              <div key={owner}>
                <Label>
                  {isSigned ? "Signed" : "Pending"}: {owner}
                </Label>
                <Tooltip title="Remind owner to sign">
                  <NotificationsNoneIcon />
                </Tooltip>
              </div>
            );
          }
          return null;
        })}
      {transaction && (
        <BillExecute transaction={transaction} handleExecute={handleExecute} />
      )}
    </div>
  );
};

export default Payment;
