import React, { useState, useMemo } from "react";
import Transaction from "./Transaction";
import Pagination from "../../../molecules/Pagination/Pagination";


function TransactionList({ transactions }) {
  const [page, setPage] = useState(1);
  const perPage = 5;

  const paginatedTransactions = useMemo(() => {
    const start = (page - 1) * perPage;
    const end = start + perPage;
    return transactions.slice(start, end);
  }, [page, transactions]);

  return (
    <>
      {paginatedTransactions.map((transaction, index) => (
        <Transaction key={index} transaction={transaction} />
      ))}

      <Pagination
        currentPage={page}
        totalPages={Math.ceil(transactions.length / perPage)}
        onPageChange={setPage}
      />
    </>
  );
}


export default TransactionList;