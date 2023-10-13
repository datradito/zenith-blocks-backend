import React, { useState, useEffect } from "react";
import { message } from "antd";
import { useAccount, useSendTransaction, useWaitForTransaction } from "wagmi";
import useTokenBalances from "../../hooks/Swap/useTokenBalances";
import styled from "styled-components";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Box, IconButton } from "@mui/material";
import TokenSelectorModal from "./TokenSelectorModal";
import SettingsPopover from "./SettingsPopOver";
import TokenInput from "./TokenInput";
import SwapButton from "./SwapButton";
import tokenList from "../../../Utility/tokenList";
import RefreshIcon from "@mui/icons-material/Refresh";
import axios from "axios";
import Label from "../../atoms/Label/Label";
import Container from "../../atoms/Container/Container.jsx";

const TradeBox = styled(Box)`
  width: 400px;
  background-color: #0e111b;
  min-height: 300px;
  border-radius: "0.8rem";
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 1rem;
  margin: 5rem auto;
  color: white;
  border-radius: 1rem;
`;

const SwitchButton = styled(IconButton)`
  background-color: #3a4157;
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
  display: flex;
  border-radius: 50%;
  padding: 1rem;
  color: white;
  border: 3px solid #0e111b;
  font-size: 12px;
  transition: 0.3s;
  &:hover {
    background-color: #3a4157;
  }
  position: absolute;
  top: 54%;
  left: 50%;
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

const TradeBoxHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  width: 100%;
`;

function Swap() {
  const { address, isConnected } = useAccount();
  const [messageApi, contextHolder] = message.useMessage();
  const [slippage, setSlippage] = useState(2.5);
  const [tokenOneAmount, setTokenOneAmount] = useState(0);
  const [tokenTwoAmount, setTokenTwoAmount] = useState(0);
  const [tokenOne, setTokenOne] = useState(tokenList[0]);
  const [tokenTwo, setTokenTwo] = useState(tokenList[1]);
  const [isOpen, setIsOpen] = useState(false);
  const [changeToken, setChangeToken] = useState(1);
  const [prices, setPrices] = useState(null);
  const [txDetails, setTxDetails] = useState({
    to: null,
    data: null,
    value: null,
  });
  const [isRefreshLoading, setIsRefreshLoading] = useState(false);
  const [hovered, setHovered] = useState(false);

  const {
    data: tokenBalance,
    isLoading: isTokenBalanceLoading,
    isError,
  } = useTokenBalances(address);

  const handleHover = () => {
    setHovered((prev) => !prev);
  };

  const { data, sendTransaction } = useSendTransaction({
    from: address,
    to: txDetails.to,
    data: txDetails.data,
    value: txDetails.value,
    onError(error) {
      console.log("Error", error);
    },
  });

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  function handleSlippageChange(e) {
    setSlippage(e.target.value);
  }

  function changeAmount(e) {
    setTokenOneAmount(e.target.value);
    if (e.target.value !== "" && prices) {
      setTokenTwoAmount((e.target.value * prices.ratio).toFixed(2));
    } else {
      setTokenTwoAmount(null);
    }
  }

  async function switchTokens() {
    setIsRefreshLoading(true);
    const newTokenOneAmount = tokenTwoAmount;
    setTokenOneAmount(newTokenOneAmount);
    const one = tokenOne;
    const two = tokenTwo;
    setTokenOne(two);
    setTokenTwo(one);
    const newPrice = await fetchPrices(two.address, one.address);
    if (newPrice) {
      setTokenTwoAmount((newTokenOneAmount * newPrice.ratio).toFixed(2));
      setIsRefreshLoading(false);
    } else {
      console.error("Error");
      setIsRefreshLoading(false);
    }
  }

  function openModal(asset) {
    setChangeToken(asset);
    setIsOpen(true);
  }

  function modifyToken(i) {
    setPrices(null);
    setTokenOneAmount(null);
    setTokenTwoAmount(null);
    if (changeToken === 1) {
      setTokenOne(tokenList[i]);
      fetchPrices(tokenList[i].address, tokenTwo.address);
    } else {
      setTokenTwo(tokenList[i]);
      fetchPrices(tokenOne.address, tokenList[i].address);
    }
    setIsOpen(false);
  }

  async function fetchPrices(one, two) {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/tokenPrice`, {
      params: { addressOne: one, addressTwo: two },
    });
    setPrices(res.data);
    return res.data;
  }

  async function checkAllowance() {
    return await axios.get(`${process.env.REACT_APP_API_URL}/allowance`, {
      params: { tokenAddress: tokenOne.address, walletAddress: address },
    });
  }

  async function fetchDexSwap() {
    const allowance = await checkAllowance();

    if (allowance.data.allowance === "0") {
      const approve = await axios.get(
        `${process.env.REACT_APP_API_URL}/approve`,
        {
          params: {
            tokenOneAddress: tokenOne.address,
          },
        }
      );
      setTxDetails((prevTxDetails) => ({
        ...prevTxDetails,
        to: approve.data.to,
        data: approve.data.data,
        value: approve.data.value,
      }));
      return;
    }

    const tx = await axios.get(
      `https://api.1inch.io/v5.0/1/swap?fromTokenAddress=${
        tokenOne.address
      }&toTokenAddress=${tokenTwo.address}&amount=${tokenOneAmount.padEnd(
        tokenOne.decimals + tokenOneAmount.length,
        "0"
      )}&fromAddress=${address}&slippage=${slippage}`
    );

    let decimals = Number(`1E${tokenTwo.decimals}`);
    setTokenTwoAmount((Number(tx.data.toTokenAmount) / decimals).toFixed(2));
    setTxDetails(tx.data.tx);
  }

  const handleRefresh = async () => {
    setIsRefreshLoading(true);
    const newPrice = await fetchPrices(tokenOne.address, tokenTwo.address);
    if (newPrice) {
      setIsRefreshLoading(false);
    } else {
      console.error("Error");
      setIsRefreshLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices(tokenList[0].address, tokenList[1].address);
  }, []);

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

  return (
    <div
      style={{
        border: "none",
        width: "100%",
        height: "100vh",
        background: "rgb(26,28,30)",
        background:
          "linear-gradient(90deg, rgba(26,28,30,1) 0%, rgba(31,38,57,1) 35%, rgba(14,17,27,1) 100%)",
        margin: "0",
        paddingTop: "1rem",
      }}
    >
      {contextHolder}
      <TokenSelectorModal
        isOpen={isOpen}
        closeModal={handleCloseModal}
        tokenList={tokenList}
        modifyToken={modifyToken}
      />
      <TradeBox>
        <TradeBoxHeader>
          <Label
            style={{
              fontSize: "1rem",
              lineHeight: "20px",
              fontWeight: "500",
              paddingBottom: "4px",
              cursor: "pointer",
              color: "white",
            }}
          >
            Swap
          </Label>
          <Container
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              margin: 0,
              border: "none",
            }}
          >
            <StyledRefreshIcon onClick={handleRefresh} />
            <SettingsPopover
              slippage={slippage}
              handleSlippageChange={handleSlippageChange}
            />
          </Container>
        </TradeBoxHeader>
        <div
          style={{
            position: "relative",
          }}
        >
          <TokenInput
            tokenAmount={tokenOneAmount}
            token={tokenOne}
            validationType="number"
            onTokenAmountChange={changeAmount}
            openTokenSelector={openModal}
            openTokenSelectorNumber={1}
            backgroundColor="#1f2639"
            tokenType="Sell"
            AssetHoverColor="#0E111B"
            getUserTokenBalance={tokenBalance}
          />
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
          <TokenInput
            tokenAmount={tokenTwoAmount}
            token={tokenTwo}
            validationType="readOnly"
            openTokenSelector={openModal}
            openTokenSelectorNumber={2}
            backgroundColor=""
            tokenType="Buy"
            AssetHoverColor="#1f2639"
            isRefreshLoading={isRefreshLoading}
            getUserTokenBalance={tokenBalance}
          />
        </div>
        <SwapButton
          tokenOneAmount={tokenOneAmount}
          isConnected={isConnected}
          fetchDexSwap={fetchDexSwap}
        />
      </TradeBox>
    </div>
  );
}

export default Swap;
