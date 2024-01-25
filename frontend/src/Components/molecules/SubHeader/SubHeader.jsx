import React from "react";
import Button from "../../atoms/Button/Button.jsx";
import List from "../../atoms/List/List.jsx";
import { CSVLink } from "react-csv";
import ToolTip from "../../atoms/ToolTip/ToolTip.jsx";

const listStylesRow = {
  alignItems: "flex-start",
  justifyContent: "flex-end",
  padding: "0",
  gap: "2.5rem",
};

const listStylesContainer = {
  margin: "0",
  width: "100%",
  flexDirection: "row",
};

function SubHeader({ children }) {
  return <List {...listStylesContainer}>{children}</List>;
}

function Items({ id, children, styles }) {
  return (
    <List key={id} {...listStylesRow} {...styles}>
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
          ...sx,
        }}
        onClick={handleClick}
      >
        {label}
      </Button>
    </ToolTip>
  );
}

function ExportCSVButton({
  onClick,
  label,
  disabled,
  sx,
  info = "",
  data = [],
  filename = "Transactions",
}) {
  function handleClick() {
    onClick?.();
  }

  //we can make adjustments to data before passing down to CSVLink
  //for example a service which customizes based on if its budget invoices or transactions
  return (
    <CSVLink data={data} filename={filename} target="_blank">
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

export default SubHeader;
