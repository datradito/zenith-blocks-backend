import React, { useState } from "react";
import Table from "../../../molecules/Table/Table";
import Label from "../../../atoms/Label/Label";
import GetEnsName from "../../../molecules/GetEnsName/GetEnsName";
import { HiTrash } from "react-icons/hi2";
import Button from "../../../atoms/Button/Button";
import Modal from "../../../molecules/Modal/Modal";
import CustomActionIcon from "../../../atoms/ActionIcon/CustomActionIcon";
import EditContact from "./EditContact";
import { Tooltip } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { message } from "antd";
import Switch from "@mui/material/Switch";

const label = { inputProps: { "aria-label": "Switch demo" } };

function ContactsRow({ contact, index }) {
  const [selected, setSelected] = useState(false);

  const onToggleChange = () => {
    if (contact?.email) {
      setSelected(!selected);
    } else {
      setSelected(false);
      message.error("Please add email to enable notifications");
    }
  };
  return (
    <Table.Row>
      <Label color="white">{index + 1}</Label>
      <Label color="white">Name</Label>
      <GetEnsName address={contact.to} />
      {/* <Tooltip
        title={!contact?.email ? "Please setup email to enable notifications" : selected ? "Disable Notification" : "Enable Notification"}
        arrow
      >
        <Switch
          onChange={onToggleChange}
          {...label}
          disabled={!contact?.email}
          defaultChecked={selected ? true : false}
        />
      </Tooltip> */}
      {/* <ToggleButton
        value="check"
        selected={selected}
        sx={{
          display: "flex",
          background: "transparent",
          width: "3rem",
        }}
        onChange={onToggleChange}
      >
        <Tooltip
          title={selected ? "Disable Notification" : "Enable Notification"}
          arrow
        >
          <NotificationsActiveIcon
            sx={{
              color: selected ? "green" : "white",
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          />
        </Tooltip>
      </ToggleButton> */}
      <HiTrash />
      <Modal>
        <Modal.Open opens="editContact">
          <CustomActionIcon />
        </Modal.Open>

        <Modal.Window name="editContact">
          <EditContact contact={contact} />
        </Modal.Window>
      </Modal>
      <Button
        variant="primary"
        sx={{
          width: "5rem",
        }}
        onClick={console.log("send transaction")}
      >
        Send
      </Button>
    </Table.Row>
  );
}

export default ContactsRow;
