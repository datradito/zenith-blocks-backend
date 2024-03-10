import React from "react";
import Button from "../../../atoms/Button/Button";
import styled, { css } from "styled-components";
import List from "../../../atoms/List/List";

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
function FilterTransactions({ transactionType, onTabChange, currentFilter }) {
  const handleClick = (type) => () => {
    onTabChange({
      activeTab: type,
    });
  };

  return (
    <List {...listStyles}>
      <StyledButton
        active={transactionType === "All"}
        onClick={handleClick("All")}
      >
        All
      </StyledButton>
      <StyledButton
        active={transactionType === "Incoming"}
        onClick={handleClick("Incoming")}
      >
        Incoming
      </StyledButton>
      <StyledButton
        active={transactionType === "Pending"}
        onClick={handleClick("Pending")}
      >
        Pending
      </StyledButton>
      <StyledButton
        active={transactionType === "Multisig"}
        onClick={handleClick("Multisig")}
      >
        MultiSig
      </StyledButton>
    </List>
  );
}

export default FilterTransactions;
