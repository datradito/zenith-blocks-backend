import React from "react";
import { Box } from "@mui/material";
import styled from "styled-components";
import { Typography } from "antd";

const TokenLogo = styled("img")`
  height: 40px;
  width: 40px;
`;

const TokenName = styled(Typography)`
  margin-left: 10px;
  font-size: 16px;
  font-weight: 500;
  width: "100%";
  color: grey;
`;

const TokenTicker = styled(Typography)`
  margin-left: 10px;
  font-size: 13px;
  font-weight: 300;
  color: grey;
`;
const TokenChoiceContainer = styled(Box)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  &:hover {
    cursor: pointer;
    background-color: #1f2639;
  }
  &:hover ${TokenName} {
    color: white;
  }
  &:hover ${TokenTicker} {
    color: white;
  }
`;

const TokenChoice = ({ token, onClick }) => {
  return (
    <TokenChoiceContainer onClick={onClick}>
      <TokenLogo src={token.img} alt={token.ticker} />
      <div>
        <TokenName>{token.name}</TokenName>
        <TokenTicker>{token.ticker}</TokenTicker>
      </div>
    </TokenChoiceContainer>
  );
};

export default TokenChoice;
