import React, { useMemo } from "react";
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

  const { billFilter, setBillFilter } = useBillStore();

  const handleStatusClick = (status) => {
    setBillFilter({ ...billFilter, status: status?.toLowerCase() });
  };

  const billStatus = useMemo(() => {
    return billFilter.status?.toLowerCase() || "all";
  } , [billFilter.status]);

  return (
    <List {...listStyles}>
      <StyledButton
        active={billStatus === "all" || billStatus === null}
        onClick={() => handleStatusClick()}
      >
        All
      </StyledButton>
      <StyledButton
        active={billStatus === "paid"}
        onClick={() => handleStatusClick("paid")}
      >
        Paid
      </StyledButton>
      <StyledButton
        active={billStatus === "unpaid"}
        onClick={() => handleStatusClick("unpaid")}
      >
        Unpaid
      </StyledButton>
      <StyledButton
        active={billStatus === "readytoexecute"}
        onClick={() => handleStatusClick("readytoexecute")}
      >
        Pending Execute
      </StyledButton>
    </List>
  );
}

export default FilterBills;
