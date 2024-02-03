import React from "react";
import Button from "../../atoms/Button/Button";
import styled, { css } from "styled-components";
import List from "../../atoms/List/List";
import { useInvoice } from "../../../Utility/Providers/InvoiceProvider";

const StyledButton = styled(Button)`
  background-color: ${(props) => (props.selected ? "#055FFC" : "transparent")};
  width: fit-content;

  &:hover {
    background-color: lightgrey;
  }
  &:focus {
    background-color: #272a2e;
  }
  &:active {
    background-color: #272a2e;
  }

  ${(props) =>
    props.active &&
    css`
      background-color: #272a2e;
    `}
`;

const listStyles = {
  flexDirection: "row",
  margin: "1rem 0 1rem 0",
  justifyContent: "flex-start",
};

function FilterInvoices() {

  const { refetchInvoices } = useInvoice();

  const [currentFilter, setCurrentFilter] = React.useState("All");

  const handleStatusClick = (status) => {
    setCurrentFilter(status);
    refetchInvoices(status);
  };

  return (
    <List {...listStyles}>
      <StyledButton
        active={currentFilter === "All"}
        onClick={() => handleStatusClick()}>All</StyledButton>
      <StyledButton
        active={currentFilter === "Paid"}
        onClick={() => handleStatusClick("Paid")}>
        Paid
      </StyledButton>
      <StyledButton
        active={currentFilter === "Unpaid"}
        onClick={() => handleStatusClick("Unpaid")}>
        Unpaid
      </StyledButton>
      <StyledButton
        active={currentFilter === "Partial Paid"}
        onClick={() => handleStatusClick("Partial Paid")}>
        Partial Paid
      </StyledButton>
    </List>
  );
}

export default FilterInvoices;
