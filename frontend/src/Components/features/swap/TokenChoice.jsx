import React from "react";
import styled from "styled-components";
import Label from "../../atoms/Label/Label";
import Container from "../../atoms/Container/Container";
import AssetLogo from "../../molecules/Swap/AssetLogo";

const TokenLogo = styled(AssetLogo)`
  height: 40px;
  width: 40px;
`;

const TokenName = styled(Label)`
  font-weight: 500;
  width: "100%";
`;

const TokenTicker = styled(Label)`
  margin-left: 10px;
  font-weight: 300;
  font-size: 12px;
`;
const TokenChoiceContainer = styled(Container)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: none;
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
  outline: none;
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
