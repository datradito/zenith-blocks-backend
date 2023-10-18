import React from 'react'
import Button from "../../atoms/Button/Button.jsx";
import List from "../../atoms/List/List.jsx";
import Container from '../../atoms/Container/Container.jsx';

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
        gap: "0.5rem",
        padding: "0",
        ...sx,
      }}
    >
      {children}
    </List>
  );
}

function ActionButton({ onClick, label, disabled, sx }) {
  function handleClick() {
      onClick?.();
    }
  return (
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
  );
}
  
SubHeader.List = Items;
SubHeader.ActionButton = ActionButton;
SubHeader.Container = SubHeader;

export default SubHeader
