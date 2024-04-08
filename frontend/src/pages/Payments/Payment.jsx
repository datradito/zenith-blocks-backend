import React, { useState, useEffect, useMemo } from "react";
import useSafeTransaction from "../../Components/hooks/Safe/useSafeTransaction.jsx";
import useAuthStore from "../../store/modules/auth/index.ts";
import useSafeStore from "../../store/modules/safe/index.ts";
import BillConfirmations from "../../Components/features/bills/BillConfirmations.jsx";
import BillExecute from "../../Components/features/payments/BillExecute.jsx";
import PendingSigns from "../../Components/features/payments/PendingSigns.jsx";
import Signed from "../../Components/features/payments/Signed.jsx";
import { message } from "antd";

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
    message.loading({ content: "Executing transaction...", key: "execute" });
    try {
      if (txHash) await isTxExecutable(txHash);

      message.success({
        content: "Transaction executed successfully",
        key: "execute",
      });
    } catch (err) {
      setError(err);
      message.error({
        content: "Transaction could not be executed",
        key: "execute",
      });
    }
    message.destroy("execute");
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
      {transaction &&
        (() => {
          const signedOwners = [];
          const pendingOwners = [];

          safeOwners.forEach((owner) => {
            const isSigned = transaction.confirmations.some(
              (confirmation) =>
                confirmation.owner.toLowerCase() === owner.toLowerCase()
            );

            if (isSigned) {
              signedOwners.push(owner);
            } else {
              pendingOwners.push(owner);
            }
          });

          return (
            <>
              <Signed signed={signedOwners} />
              <PendingSigns owners={pendingOwners} />
            </>
          );
        })()}
      {transaction && (
        <BillExecute
          transaction={transaction}
          handleSign={handleSignTransaction}
          signedByCurrentUser={signedByCurrentUser}
          handleExecute={handleExecute}
        />
      )}
    </div>
  );
};

export default Payment;
