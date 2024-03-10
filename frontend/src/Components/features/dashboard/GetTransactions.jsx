import React, {Suspense, useMemo } from "react";
import EmptyIcon from "../../atoms/EmptyIcon/EmptyIcon";
import CircularIndeterminate from "../../atoms/Loader/loader";
import SwapHorizontalCircleIcon from "@mui/icons-material/SwapHorizontalCircle";
import { Stack, Typography } from "@mui/material";
import SearchSelect from "../../atoms/Search/SearchSelect";
import FilterTransactions from "./Transactions/FilterTransactions";
import useDashboardStore from "../../../store/modules/dashboard/index.ts";
import useTransactionHistory from "../../hooks/Dashboard/useTransactionHistory.jsx";
const TransactionStatuses = ["Success", "Failed", "Pending", "Ready"];

const TransactionList = React.lazy(() =>
  import("./Transactions/TransactionsList")
);

function GetTransactions() {
  const { txs: transactions, loading, count } = useTransactionHistory();
  const { transactionFilter, onChangeTransactionFilter } = useDashboardStore();

  
  const transactionList = useMemo(() => {

    if (loading) return <CircularIndeterminate />;
    
    return count > 0 ? (
      <Suspense fallback={<CircularIndeterminate />}>
        <TransactionList
          transactions={transactions}
          filter={transactionFilter.status}
          count={count}
        />
      </Suspense>
    ) : (
      <EmptyIcon />
      );
  }, [transactions, transactionFilter]);
  
    const handleSearch = (value) => {
      onChangeTransactionFilter({
        status: Array.isArray(value) ? value : [value],
      });
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
        transactionType={transactionFilter.activeTab}
        currentFilter={transactionFilter}
        onTabChange={onChangeTransactionFilter}
      />
      {transactionList}
    </Stack>
  );
}

export default GetTransactions;
