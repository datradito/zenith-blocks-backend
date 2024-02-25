import React, { useContext, useMemo, useState } from "react";
import Label from "../../../atoms/Label/Label";
import Table from "../../../molecules/Table/Table";
import { DashboardContext } from "../../../../Utility/Providers/DashboardProvider";
import Pagination from "../../../molecules/Pagination/Pagination";
import ContactsRow from "./ContactsRow";

function ContactsList() {
    const { transactionHistory } = useContext(DashboardContext);

  const [page, setPage] = useState(1);
  const perPage = 5;

const transactions = useMemo(() => {
  return (transactionHistory.transactions || []).filter(
    (transaction, index, self) =>
      index ===
      self.findIndex(
        (t) =>
          t.to === transaction.to 
      )
  );
}, [transactionHistory]);

const paginatedTransactions = useMemo(() => {
  const start = (page - 1) * perPage;
  const end = start + perPage;
  return transactions.slice(start, end);
}, [page, transactions]);

  return (
    <>
      <Table columns="0.15fr 0.75fr 5fr 0.5fr 0.5fr 1.5fr">
        <Table.Header>
          <p></p>
          <Label>ENS</Label>
          <Label>Address</Label>
        </Table.Header>
        <Table.Body
          data={paginatedTransactions}
          render={(contact, index) => {
            return <ContactsRow key={index} contact={contact} index={index} />;
          }}
        />
      </Table>
      <Pagination
        currentPage={page}
        totalPages={Math.ceil(transactions.length / perPage)}
        onPageChange={setPage}
      />
    </>
  );
}

export default ContactsList;
