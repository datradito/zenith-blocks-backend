import React, { useState, useMemo } from "react";
import Transaction from "./Transaction";
import Pagination from "../../../molecules/Pagination/Pagination";
import Label from "../../../atoms/Label/Label";
import Table from "../../../molecules/Table/Table";

function TransactionList({ transactions,filter, count }) {
  const [page, setPage] = useState(1);
  const perPage = 5;
  console.log(filter)

  const paginatedTransactions = useMemo(() => {
    let filteredTransactions = transactions;

    console.log(filteredTransactions)


    if (filter && filter.length > 0) {
      const searchStatuses = filter.map((s) => s.trim().toLowerCase());
      filteredTransactions = transactions.filter((transaction) =>
        searchStatuses.includes(transaction.status.toLowerCase())
      );
    }

    
    const start = (page - 1) * perPage;
    const end = start + perPage;
    return filteredTransactions.slice(start, end);
  }, [page, transactions, filter]);

  return (
    <>
      <Table columns="0.5fr auto">
        <Table.Header>
          <Label>Status</Label>
          <Label>Transaction</Label>
          {/* <Label>Address</Label> */}
        </Table.Header>
        <Table.Body
          data={paginatedTransactions}
          render={(transaction, index) => {
            return <Transaction key={index} transaction={transaction} index={index} />;
          }}
        />
      </Table>
      <Pagination
        currentPage={page}
        totalPages={Math.ceil(count / perPage)}
        onPageChange={setPage}
      />
    </>
  );
}

export default TransactionList;
