import React, { useState, useMemo } from "react";
import Table from "../../molecules/Table/Table";
import Menus from "../../molecules/Menus/Menus";
import BillRow from "./BillRow";
import CircularIndeterminate from "../../atoms/Loader/loader";
import Pagination from "../../molecules/Pagination/Pagination";

import Checkbox from "@mui/material/Checkbox";

function BillList({ isLoading, invoices }) {
  const [selected, setSelected] = useState({}); // Track selected items
  const [selectAll, setSelectAll] = useState(false); // Track select all state

  const handleSelectAll = () => {
    const newSelected = {};

    paginatedInvoices.forEach((invoice) => {
      newSelected[invoice.id] = !selectAll;
    });

    setSelectAll(!selectAll);
    setSelected(newSelected);
  };

  const handleSelect = (id) => {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const [page, setPage] = useState(1);
  const perPage = 5;
  const paginatedInvoices = useMemo(() => {
    const start = (page - 1) * perPage;
    const end = start + perPage;
    return invoices.slice(start, end);
  }, [page, invoices]);

  if (isLoading) {
    return <CircularIndeterminate />;
  }

  return (
    <>
      <Menus>
        <Table columns="0.2fr 0.3fr 1fr 0.5fr 0.5fr 0.5fr 0.5fr 0.5fr 0.5fr 0.5fr 0.2fr">
          <Table.Header>
            <Checkbox onChange={handleSelectAll} checked={selectAll} />
            <div>Invoice</div>
            <div>Recipient</div>
            <div>Amount</div>
            <div>Currency</div>
            <div>Status</div>
            <div>Date</div>
            <div>Due</div>
            <div>View</div>
            <div>Payment</div>
            <div>Action</div>
          </Table.Header>

          <Table.Body
            data={paginatedInvoices}
            render={(invoice) => (
              <BillRow
                invoice={invoice}
                key={invoice.id}
                onChange={() => handleSelect(invoice.id)}
                checked={!!selected[invoice.id]}
              />
            )}
          />
        </Table>
      </Menus>
      <Pagination
        currentPage={page}
        totalPages={Math.ceil(invoices.length / perPage)}
        onPageChange={setPage}
      />
    </>
  );
}

export default BillList;
