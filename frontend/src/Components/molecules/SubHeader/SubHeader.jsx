import React from 'react'
import Button from "../../atoms/Button/Button.jsx";
import List from "../../atoms/List/List.jsx";
import Container from '../../atoms/Container/Container.jsx';
import { CSVLink } from "react-csv";
import ToolTip from '../../atoms/ToolTip/ToolTip.jsx';

function SubHeader({ children, sx }) {
  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        border: "none",
        ...sx
      }}
    >
      {children}
    </Container>
  );
}

function Items({ id, children, sx }) {
  return (
    <List
      key={id}
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-end",
        gap: "0.5rem",
        padding: "0",
        ...sx,
      }}
    >
      {children}
    </List>
  );
}

function ActionButton({ onClick, label, disabled, sx, info = "" }) {
  function handleClick() {
      onClick?.();
    }
  return (
    <ToolTip info={info} placement="top">
    <Button
      disabled={disabled}
      sx={{
        backgroundColor: disabled ? "#9bb8ff" : "#055FFC",
        ...sx
      }}
      onClick={handleClick}
    >
      {label}
      </Button>
    </ToolTip>
  );
}

function ExportCSVButton({ onClick, label, disabled, sx, info = "", data = [], filename = "Transactions" }) {
  function handleClick() {
    onClick?.();
  }

  //we can make adjustments to data before passing down to CSVLink
  //for example a service which customizes based on if its budget invoices or transactions
  return (
    <CSVLink
      data={data}
      filename={filename}
      target="_blank"
    >
        <Button
          sx={{
            backgroundColor: disabled ? "#9bb8ff" : "#055FFC",
            ...sx,
          }}
          onClick={handleClick}
        >
          {label}
        </Button>
    </CSVLink>
  );
}
  
SubHeader.List = Items;
SubHeader.ActionButton = ActionButton;
SubHeader.ExportCSVButton = ExportCSVButton;
SubHeader.Container = SubHeader;

export default SubHeader
