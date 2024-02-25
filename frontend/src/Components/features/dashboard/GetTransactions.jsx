import React, { useContext, Suspense, useState, useMemo } from "react";
import EmptyIcon from "../../atoms/EmptyIcon/EmptyIcon";
import { DashboardContext } from "../../../Utility/Providers/DashboardProvider";
import CircularIndeterminate from "../../atoms/Loader/loader";
import SwapHorizontalCircleIcon from "@mui/icons-material/SwapHorizontalCircle";
import { Stack, Typography } from "@mui/material";
import SearchSelect from "../../atoms/Search/SearchSelect";
import FilterTransactions from "./Transactions/FilterTransactions";

const TransactionStatuses = [
  "Success",
  "Failed",
];

const TransactionList = React.lazy(() =>
  import("./Transactions/TransactionsList")
);

function GetTransactions() {
  const { transactionHistory, transactionType, filterTransactions } =
    useContext(DashboardContext);
  const [filter, setFilter] = useState({});

  
  const transactionList = useMemo(() => {
    if (transactionHistory?.loading) return <CircularIndeterminate />;
    return transactionHistory?.count > 0 ? (
      <Suspense fallback={<CircularIndeterminate />}>
        <TransactionList
          transactions={transactionHistory.transactions}
          filter={filter}
        />
      </Suspense>
    ) : (
      <EmptyIcon />
      );
  }, [transactionHistory, filter]);
  
    const handleSearch = (value) => {
      setFilter({ search: value });
    };
  

  return (
    <Stack padding={2}>
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        gap="1rem"
        marginBottom={2}
        border="none"
      >
        <Stack flexDirection="row" alignItems="center" border="none">
          <SwapHorizontalCircleIcon />
          <Typography variant="h6">Transactions</Typography>
        </Stack>
        <SearchSelect onChange={handleSearch} options={TransactionStatuses} />
      </Stack>
      <FilterTransactions
        transactionType={transactionType}
        filterTransactions={filterTransactions}
      />
      {transactionList}
    </Stack>
  );
}

export default GetTransactions;
