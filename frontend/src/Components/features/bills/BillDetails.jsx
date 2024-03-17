import React, { useState, useEffect } from "react";
import useSafeTransaction from "../../hooks/Safe/useSafeTransaction";
import useAuthStore from "../../../store/modules/auth/index.ts";
import useSafeStore from "../../../store/modules/safe/index.ts";
import { Button } from "antd";
import Label from "../../atoms/Label/Label";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Toolbar, Tooltip } from "@mui/material";
// Import your ErrorBoundary component

const BillDetails = ({ txHash }) => {
  const { getTransaction, confirmTransactionWithHash, isTxExecutable } = useSafeTransaction();
  //for now lets just get user form AuthStore but we need better way to centralize this kinda data which is used thorugh out the site
  const {
    user: { address },
  } = useAuthStore();

  const { safeOwners } = useSafeStore();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransaction = async () => {
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
      const signature = await confirmTransactionWithHash(txHash);
      console.log(signature);
    } catch (err) {
      setError(err);
    }
  };

  const handleExecute = async () => {
    try {
      await isTxExecutable(transaction);
    } catch (err) {
      setError(err);
    }
  };

  // if (!transaction || !Array.isArray(transaction.confirmations)) {
  //   throw new Error("Invalid transaction object");
  // }

  // const doesAddressExist = transaction.confirmations.some((confirmation) => {
  //   if (typeof confirmation.owner !== "string" || typeof address !== "string") {
  //     throw new Error("Invalid address");
  //   }

  //   return confirmation.owner.toLowerCase() === address.toLowerCase();
  // });

  const signedByCurrentUser = () => {
    if (!transaction || !Array.isArray(transaction.confirmations)) {
      throw new Error("Invalid transaction object");
    }

    if (typeof address !== "string") {
      throw new Error("Invalid address");
    }

    return transaction.confirmations.some(
      (confirmation) => confirmation.owner.toLowerCase() === address.toLowerCase()
    );
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

    return (
    <div>
      <>
        <Label>
          Confirmation Required : {transaction.confirmationsRequired}
        </Label>
        {transaction.confirmations.map((confirmation) => (
          <div key={confirmation.owner}>
            <Label>Signed By: {confirmation.owner}</Label>
          </div>
        ))}
      </>
      {signedByCurrentUser ? (
        <Label>You have already signed this transaction</Label>
      ) : (
        <Button onClick={handleSignTransaction}>sign</Button>
      )}

      {safeOwners.map((owner) => {
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
        return null; // Return null at end of arrow function
      })}

      {transaction.confirmations.length ===
        transaction.confirmationsRequired && (
        <Button onClick={handleExecute}>Execute</Button>
      )}
    </div>
  );
};

export default BillDetails;
