import React, { useState, useEffect } from "react";
import { Radio, message } from "antd";
import { useAccount, useSendTransaction, useWaitForTransaction } from "wagmi";
import styled from "styled-components";
import { Box, Typography } from "@mui/material";
import TokenSelectorModal from "./TokenSelectorModal";
import SettingsPopover from "./SettingsPopOver";
import TokenInput from "./TokenInput";
import SwapButton from "./SwapButton";
import tokenList from "../../../Utility/tokenList";
import axios from "axios";

const TradeBox = styled(Box)`
  width: 400px;
  background-color: #0e111b;
  border: 2px solid #21273a;
  min-height: 300px;
  border-radius: "0.8rem";
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding-left: 30px;
  padding-right: 30px;
  margin: 5rem auto;
  color: white;
`;

const TradeBoxHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  margin-top: 10px;
  width: 98%;
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

  function switchTokens() {
    setPrices(null);
    const newTokenOneAmount = tokenTwoAmount;
    const newTokenTwoAmount = tokenTwoAmount;
    setTokenOneAmount(newTokenOneAmount);
    const one = tokenOne;
    const two = tokenTwo;
    setTokenOne(two);
    setTokenTwo(one);
    fetchPrices(two.address, one.address);
    setTokenTwoAmount((tokenOneAmount * prices.ratio).toFixed(2));
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

  const settings = (
    <>
      <div>Slippage Tolerance</div>
      <div>
        <Radio.Group value={slippage} onChange={handleSlippageChange}>
          <Radio.Button value={0.5}>0.5%</Radio.Button>
          <Radio.Button value={2.5}>2.5%</Radio.Button>
          <Radio.Button value={5}>5.0%</Radio.Button>
        </Radio.Group>
      </div>
    </>
  );

  return (
    <>
      {contextHolder}
      <TokenSelectorModal
        isOpen={isOpen}
        closeModal={handleCloseModal}
        tokenList={tokenList}
        modifyToken={modifyToken}
      />
      <TradeBox>
        <TradeBoxHeader>
          <Typography variant="h5">Swap</Typography>
          <SettingsPopover settings={settings} />
        </TradeBoxHeader>
        <TokenInput
          tokenOneAmount={tokenOneAmount}
          tokenTwoAmount={tokenTwoAmount}
          tokenOne={tokenOne}
          tokenTwo={tokenTwo}
          onTokenAmountChange={changeAmount}
          switchTokens={switchTokens}
          openTokenSelector={openModal}
        />
        <SwapButton
          tokenOneAmount={tokenOneAmount}
          isConnected={isConnected}
          fetchDexSwap={fetchDexSwap}
        />
      </TradeBox>
    </>
  );
}

export default Swap;
