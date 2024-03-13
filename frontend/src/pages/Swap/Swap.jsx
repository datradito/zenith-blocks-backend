import React, { useEffect, useContext } from "react";

import { useAccount, useSendTransaction, useWaitForTransactionReceipt } from "wagmi";

import SwapLayout from "../../Components/molecules/Swap/SwapLayout";
import FromToken from "../../Components/features/swap/FromToken";
import ToToken from "../../Components/features/swap/ToToken";
import SwapButton from "../../Components/features/swap/SwapButton";
import TokenSelectorModal from "../../Components/features/swap/TokenSelectorModal";
import SettingsPopover from "../../Components/features/swap/SettingsPopOver";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import RefreshIcon from "@mui/icons-material/Refresh";
import Button from "../../Components/atoms/Button/Button";
import { SwapContext } from "../../utils/Providers/SwapProvider";

import styled from "styled-components";
const SwitchButton = styled(Button)`
  background-color: #3a4157;
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
  display: flex;
  border-radius: 50%;
  padding: 1rem;
  border: 3px solid #0e111b;
  transition: 0.3s;
  &:hover {
    background-color: #3a4157;
  }
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const StyledRefreshIcon = styled(RefreshIcon)({
  border: "none",
  padding: "0.3rem",
  borderRadius: "0.5rem",
  "&:hover": {
    backgroundColor: "#1F2639",
    cursor: "pointer",
  },
});

function Swap() {
  const {
    tokenTwo,
    txDetails,
    hovered,
    setIsRefreshLoading,
    setHovered,
    switchTokens,
    messageApi,
  } = useContext(SwapContext);
  const { address, isConnected } = useAccount();

  const handleHover = () => {
    setHovered((prev) => !prev);
  };

  const {
    data,
    sendTransaction,
    reset,
    error: transactionError,
  } = useSendTransaction({
    from: address,
    to: txDetails.to,
    data: txDetails.data,
    value: txDetails.value,
  });

  const { isLoading, isSuccess } = useWaitForTransactionReceipt({
    hash: data?.hash,
    confirmations: 2,
    // pollingInterval: 1000,
  });

  const handleRefresh = async () => {
    setIsRefreshLoading(true);
    const newPrice = data?.[tokenTwo.address];
    if (newPrice) {
      setIsRefreshLoading(false);
    } else {
      setIsRefreshLoading(false);
    }
  };

  useEffect(() => {
    if (txDetails.to && isConnected) {
      sendTransaction();
    }
  }, [txDetails]);

  useEffect(() => {
    messageApi.destroy();
    if (isLoading) {
      messageApi.open({
        type: "loading",
        content: "Transaction is Pending...",
        duration: 0,
      });
    }
  }, [isLoading]);

  useEffect(() => {
    messageApi.destroy();
    if (isSuccess) {
      messageApi.open({
        type: "success",
        content: "Transaction Successful",
        duration: 1.5,
      });
    } else if (txDetails.to) {
      messageApi.open({
        type: "error",
        content: "Transaction Failed",
        duration: 1.5,
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    messageApi.destroy();
    const error = JSON.parse(JSON.stringify(transactionError));
    if (transactionError) {
      messageApi.open({
        type: "error",
        content: error.shortMessage,
        duration: 4,
      });
    }

    reset();
  }, [transactionError]);

  return (
    <SwapLayout>
      <TokenSelectorModal />
      <SwapLayout.TradeBox>
        <SwapLayout.TradeBoxHeader>
          <StyledRefreshIcon onClick={handleRefresh} />
          <SettingsPopover />
        </SwapLayout.TradeBoxHeader>
        <SwapLayout.SwapMain>
          <FromToken />
          <SwitchButton
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}
            style={{ transition: "transform 0.2s" }}
            onClick={switchTokens}
          >
            <ArrowDownwardIcon
              style={{
                transform: hovered ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s",
              }}
            />
          </SwitchButton>
          <ToToken />
        </SwapLayout.SwapMain>
        <SwapButton
          isConnected={isConnected}
          address={address}
          messageApi={messageApi}
        />
      </SwapLayout.TradeBox>
    </SwapLayout>
  );
}

export default Swap;
