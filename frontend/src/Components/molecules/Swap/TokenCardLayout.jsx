import React from "react";
import Label from "../../atoms/Label/Label";
import Container from "../../atoms/Container/Container";

import List from "../../atoms/List/List";

const TokenCardLayout = ({
    children,
    sx
}) => {
    return (
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
            borderRadius: "0.8rem",
          ...sx
        }}
      >
        {children}
      </Container>
    );
}

function TokenRow({ children, sx }) {
    return (
        <List
            style={{
            width: "100%",
            margin: "0",
            padding: "0rem 0.5rem 0rem 0.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxSizing: "border-box",
            ...sx
            }}
        >
            {children}
        </List>
    );
    }

function TickerLabel({ children, sx }) {
  return (
    <Label
      style={{
        textAlign: "right",
        padding: "0 0.5rem 0.5rem 0",
        ...sx,
      }}
    >
      {children}
    </Label>
  );
}

TokenCardLayout.TickerLabel = TickerLabel;
TokenCardLayout.TokenRow = TokenRow;

export default TokenCardLayout;
