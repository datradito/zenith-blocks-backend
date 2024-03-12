import React, { useEffect, useMemo, useState } from "react";
import Label from "../../../atoms/Label/Label";
import Table from "../../../molecules/Table/Table";
import Pagination from "../../../molecules/Pagination/Pagination";
import ContactsRow from "./ContactsRow";
import Modal from "../../../molecules/Modal/Modal.jsx";
import EditContact from "./EditContact.jsx";
import { Tooltip } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import useDashboardStore from "../../../../store/modules/dashboard/index.ts";
import useGetContacts from "../../../hooks/Contacts/useGetContacts.jsx";

import CircularIndeterminate from "../../../atoms/Loader/loader.jsx";
function ContactsList() {
  //const dashboard = useDashboardStore((state) => state);
  const { contacts, refetchContacts, loading} = useGetContacts();
  const [page, setPage] = useState(1);
  const perPage = 5;

  console.log(contacts)

  // const contacts = useMemo(() => {
  //   return (dashboard.transactions || []).filter(
  //     (transaction, index, self) =>
  //       index === self.findIndex((t) => t.to === transaction.to)
  //   );
  // }, [dashboard.transactions]);
  useEffect(() => {
    if (contacts.length === 0) {
      refetchContacts();
    }
  }, [contacts]);

  if (loading) {
    <CircularIndeterminate />;
  }
const paginatedContacts = useMemo(() => {
  const start = (page - 1) * perPage;
  const end = start + perPage;
  return contacts.slice(start, end);
}, [page, contacts]);

  return (
    <>
      <Table columns="0.15fr 0.75fr 5fr 0.5fr 0.5fr 1.5fr">
        <Table.Header>
          <Modal>
            <Modal.Open opens="addContact">
              <Tooltip title="Add Contact" arrow>
                <AddCircleOutlineIcon fontSize="medium" />
              </Tooltip>
            </Modal.Open>
            <Modal.Window name="addContact">
              <EditContact />
            </Modal.Window>
          </Modal>

          <Label>ENS</Label>
          <Label>Address</Label>
          <p></p>
        </Table.Header>
        <Table.Body
          data={paginatedContacts}
          render={(contact, index) => {
            return <ContactsRow key={index} contact={contact} index={index} />;
          }}
        />
      </Table>
      <Pagination
        currentPage={page}
        totalPages={Math.ceil(contacts.length / perPage)}
        onPageChange={setPage}
      />
    </>
  );
}

export default ContactsList;
