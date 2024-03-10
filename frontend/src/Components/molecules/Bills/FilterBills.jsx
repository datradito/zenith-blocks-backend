import React from "react";
import Button from "../../atoms/Button/Button";
import styled, { css } from "styled-components";
import List from "../../atoms/List/List";
import useBillStore from "../../../store/modules/bills/index.ts";

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

function FilterBills() {

  const { billFilter, setCurrentFilter } = useBillStore();

  const handleStatusClick = (status) => {
    setCurrentFilter({ ...billFilter, status });
  };

  console.log(billFilter);

  return (
    <List {...listStyles}>
      <StyledButton
        active={billFilter.status === "All"}
        onClick={() => handleStatusClick()}
      >
        All
      </StyledButton>
      <StyledButton
        active={billFilter.status === "Paid"}
        onClick={() => handleStatusClick("Paid")}
      >
        Paid
      </StyledButton>
      <StyledButton
        active={billFilter.status === "Unpaid"}
        onClick={() => handleStatusClick("Unpaid")}
      >
        Unpaid
      </StyledButton>
      <StyledButton
        active={billFilter.status === "Partial Paid"}
        onClick={() => handleStatusClick("Partial Paid")}
      >
        Partial Paid
      </StyledButton>
    </List>
  );
}

export default FilterBills;
