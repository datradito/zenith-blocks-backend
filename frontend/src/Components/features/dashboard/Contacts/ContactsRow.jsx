import React from "react";
import Table from "../../../molecules/Table/Table";
import Label from "../../../atoms/Label/Label";
import GetEnsName from "../../../molecules/GetEnsName/GetEnsName";

function ContactsRow({ contact, index }) {
  return (
    <Table.Row>
      <Label color="white">{index + 1}</Label>
      <GetEnsName address={contact.to} />
      {/* <Label color="white">{contact.to}</Label> */}
    </Table.Row>
  );
}

export default ContactsRow;
