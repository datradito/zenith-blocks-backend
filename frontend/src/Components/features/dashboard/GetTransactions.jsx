import React, { useContext, Suspense } from "react";
import EmptyIcon from "../../atoms/EmptyIcon/EmptyIcon";
import { DashboardContext } from "../../../Utility/Providers/DashboardProvider";
import CircularIndeterminate from "../../atoms/Loader/loader";
const TransactionList = React.lazy(() =>
  import("./Transactions/TransactionsList")
);

function GetTransactions() {
  const { transactionHistory } = useContext(DashboardContext);
  if (transactionHistory?.isLoading) return <CircularIndeterminate />;

  return (
    <>
      {transactionHistory.transactionHistory.length > 0 ? (
        <Suspense fallback={<CircularIndeterminate />}>
          <TransactionList
            transactions={transactionHistory.transactionHistory}
          />
        </Suspense>
      ) : (
        <EmptyIcon />
      )}
    </>
  );
}

export default GetTransactions;
