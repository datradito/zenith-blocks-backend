import React, { useContext, Suspense } from "react";
import EmptyIcon from "../../atoms/EmptyIcon/EmptyIcon";
import { DashboardContext } from "../../../Utility/Providers/DashboardProvider";
import CircularIndeterminate from "../../atoms/Loader/loader";


const TransactionList = React.lazy(() =>
  import("./Transactions/TransactionsList")
);

function GetTransactions() {
  const { transactionHistory } = useContext(DashboardContext);

console.log(transactionHistory)

  if (transactionHistory?.loading) return <CircularIndeterminate />;

  return (
    <>
      {transactionHistory?.count > 0 ? (
        <Suspense fallback={<CircularIndeterminate />}>
          <TransactionList
            transactions={transactionHistory.transactions}
          />
        </Suspense>
      ) : (
        <EmptyIcon />
      )}
    </>
  );
}

export default GetTransactions;
