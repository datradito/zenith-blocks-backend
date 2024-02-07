import React, { useState, useMemo } from "react";
import Table from "../../molecules/Table/Table";
import Menus from "../../molecules/Menus/Menus";
import InvoiceRow from "./InvoiceRow";
import CircularIndeterminate from "../../atoms/Loader/loader";
import Pagination from "../../molecules/Pagination/Pagination";

function InvoiceList({ isLoading, invoices }) {
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
        <Table columns="0.2fr 0.7fr 0.2fr 0.2fr 0.2fr 0.2fr 0.2fr 0.2fr 0.2fr 0.2fr">
          <Table.Header>
            <div>Invoice</div>
            <div>Reciepient</div>
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
              <InvoiceRow invoice={invoice} key={invoice.id} />
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

export default InvoiceList;
