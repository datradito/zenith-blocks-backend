import React from "react";
import Button from "../../atoms/Button/Button";
import styled from "styled-components";

const SwapBtn = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #243056;
  height: 55px;
  font-size: 20px;
  border-radius: 12px;
  color: #5981f3;
  font-weight: bold;
  transition: 0.3s;
  margin-top: 8px;
  &:disabled {
    background-color: #243056;
    opacity: 0.4;
    color: #5982f39b;
    &:hover {
      cursor: not-allowed;
      background-color: #243056;
    }
  }
  &:hover {
    cursor: pointer;
    background-color: #3b4874;
  }
`;

const SwapButton = ({ tokenOneAmount, isConnected, fetchDexSwap }) => {
  return (
    <SwapBtn
      sx={{
          width: "100%"
        }}
      disabled={!tokenOneAmount || !isConnected} onClick={fetchDexSwap}>
      Swap
    </SwapBtn>
  );
};

export default SwapButton;
