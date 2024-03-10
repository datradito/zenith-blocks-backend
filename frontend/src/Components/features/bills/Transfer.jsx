import React, { useMemo, useState, useEffect } from "react";
import useTransactionHistory from "../../hooks/Dashboard/useTransactionHistory";
import CircularIndeterminate from "../../atoms/Loader/loader";
import useSafeStore from "../../../store/modules/safe/index.ts";
import useSafeTransaction from "../../hooks/Safe/useSafeTransaction";
import useDashboardStore from "../../../store/modules/dashboard/index.ts";

function Transfer({ children }) {
  const {
    chain,
    erc20Balances,
    safeBalance,
  } = useSafeStore();

  const transactionService = useSafeTransaction();

  const  transactions  = useDashboardStore((state) => state.transactions);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (
      chain &&
      erc20Balances &&
      safeBalance &&
      transactions.length >= 1 
    ) {
      setIsLoading(false);
    }
  }, [chain, erc20Balances, safeBalance]);

  const contacts = useMemo(() => {
    return (transactions || []).filter(
      (transaction, index, self) =>
        index === self.findIndex((t) => t.to === transaction.to)
    );
  }, [transactions]);

  if (isLoading) {
    return <CircularIndeterminate />;
  }

  // Pass props to children
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        chain,
        erc20Balances,
        safeBalance,
        contacts,
        transactionService,
      });
    }
    return child;
  });

  return <>{childrenWithProps}</>;
}

export default Transfer;
