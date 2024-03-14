import React from "react";
import Table from "../../../molecules/Table/Table";
import Label from "../../../atoms/Label/Label";
import GetEnsName from "../../../molecules/GetEnsName/GetEnsName";
import { HiTrash } from "react-icons/hi2";
import Button from "../../../atoms/Button/Button";
import Modal from "../../../molecules/Modal/Modal";
import CustomActionIcon from "../../../atoms/ActionIcon/CustomActionIcon";
import EditContact from "./EditContact";
import ContactDetails from "./ContactDetails";
import ConfirmDelete from "../../../atoms/ConfirmDelete/ConfirmDelete";

import useGetContacts from "../../../hooks/Contacts/useGetContacts";
import useDeleteContact from "../../../hooks/Contacts/useDeleteContact";

function ContactsRow({ contact, index }) {
  const { loadContacts } = useGetContacts();
  const { remove, removing } = useDeleteContact();

  return (
    <Table.Row>
      <Label color="white">{index + 1}</Label>
      <Label color="white">{contact.name}</Label>
      <GetEnsName address={contact.address} />
      <Modal>
        <Modal.Open opens="deleteContact">
          <HiTrash
            style={{
              cursor: "pointer",
              color: "red",
            }}
          />
        </Modal.Open>
        <Modal.Window name="deleteContact">
          <ConfirmDelete
            resourceName={contact.name}
            onConfirm={() => {
              remove(contact.id, {
                onSettled: () => {
                  loadContacts();
                },
              });
            }}
            disabled={removing}
          />
        </Modal.Window>
      </Modal>
      <Modal>
        <Modal.Open opens="editContact">
          <CustomActionIcon />
        </Modal.Open>

        <Modal.Window name="editContact">
          <EditContact defaultValues={{ address: contact.address, name: "" }} />
        </Modal.Window>
      </Modal>
      <Modal>
        <Modal.Open opens="contactInsights">
          <Button
            variant="primary"
            sx={{
              width: "5rem",
            }}
          >
            Insights
          </Button>
        </Modal.Open>
        <Modal.Window name="contactInsights">
          <ContactDetails />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default ContactsRow;
