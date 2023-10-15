import React, { useState, useEffect } from "react";
import { message } from "antd";
import { useAccount, useSendTransaction, useWaitForTransaction } from "wagmi";
import styled from "styled-components";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import TokenSelectorModal from "./TokenSelectorModal";
import SettingsPopover from "./SettingsPopOver";
import SwapButton from "./SwapButton";
import tokenList from "../../../Utility/tokenList";
import RefreshIcon from "@mui/icons-material/Refresh";
import axios from "axios";
import Label from "../../atoms/Label/Label";
import Container from "../../atoms/Container/Container.jsx";
import ToToken from "./ToToken";
import FromToken from "./FromToken";
import Button from "../../atoms/Button/Button";
import useGetTokensPrices from "../../hooks/Swap/useGetTokensPrices";


const TradeBox = styled(Container)`
  width: 400px;
  background-color: #0e111b;
  min-height: 300px;
  border-radius: 0.8rem;
  padding: 1.5rem;
  margin: 5rem auto;
  gap: 1rem,
  border-radius: 1rem;
`;

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

const TradeBoxHeader = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: none;
`;

function Swap() {
  const { address, isConnected } = useAccount();
  const [messageApi, contextHolder] = message.useMessage();
  const [slippage, setSlippage] = useState(2.5);
  const [tokenOneAmount, setTokenOneAmount] = useState(0);
  const [tokenTwoAmount, setTokenTwoAmount] = useState(0);
  const [tokenOne, setTokenOne] = useState(tokenList[0]);
  const [tokenTwo, setTokenTwo] = useState(tokenList[1]);
  const [fetchPrice, setFetchPrice] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [changeToken, setChangeToken] = useState(1);
  const [ratio, setRatio] = useState(null);
  const [txDetails, setTxDetails] = useState({
    to: null,
    data: null,
    value: null,
  });
  const [isRefreshLoading, setIsRefreshLoading] = useState(false);
  const [hovered, setHovered] = useState(false);


  const {
    data: tokenPrices,
    isLoading: isPriceLoading,
    // isError: isPriceError,
  } = useGetTokensPrices([tokenOne.address, tokenTwo.address], fetchPrice);

  useEffect(() => {
    if (tokenPrices) {
      setRatio(
        tokenPrices?.[tokenOne.address] / tokenPrices?.[tokenTwo.address]
      );
    }
  }, [tokenPrices, fetchPrice]);
  
    function changeAmount(e) {
      setTokenOneAmount(e.target.value);

      if (e.target.value !== "" && ratio) {
        setTokenTwoAmount(
            (e.target.value * ratio).toFixed(2)
        )
      } else {
        setTokenTwoAmount(null);
      }
    }

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


  async function switchTokens() {
    setIsRefreshLoading(true);
    const newTokenOneAmount = tokenTwoAmount;
    setTokenOneAmount(newTokenOneAmount);
    const one = tokenOne;
    const two = tokenTwo;
    setTokenOne(two);
    setFetchPrice(true);
    setTokenTwo(one);
    if (tokenPrices) {
      setTokenTwoAmount(
        (
          (newTokenOneAmount * tokenPrices?.[tokenTwo.address]) /
          tokenPrices?.[tokenOne.address]
        ).toFixed(2)
      );
      setIsRefreshLoading(false);
      setFetchPrice(false);
    } else {
      setIsRefreshLoading(false);
      setFetchPrice(false);
    }
  }

  function openModal(asset) {
    setChangeToken(asset);
    setIsOpen(true);
  }

  async function modifyToken(i) {
    setRatio(null);
    setTokenOneAmount(null);
    setTokenTwoAmount(null);
    if (changeToken === 1) {
      setTokenOne(tokenList[i]);
    } else {
      setTokenTwo(tokenList[i]);
    }
    setFetchPrice(true);
    setIsOpen(false);
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
            amount: tokenOneAmount,
          },
        }
      );
      console.log(approve);
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
    setFetchPrice(true);
    const newPrice = data?.[tokenTwo.address];
    if (newPrice) {
      setIsRefreshLoading(false);
      setFetchPrice(false);
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

  return (
    <div
    // style={{
    //   border: "none",
    //   width: "100%",
    //   height: "100vh",
    //   background:
    //     "linear-gradient(90deg, rgba(26,28,30,1) 0%, rgba(31,38,57,1) 35%, rgba(14,17,27,1) 100%)",
    //   margin: "0",
    // }}
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
          <FromToken
            tokenAmount={tokenOneAmount}
            token={tokenOne}
            onTokenAmountChange={changeAmount}
            openTokenSelectorNumber={1}
            openTokenSelector={openModal}
            setFetchPrice={setFetchPrice}
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
          <ToToken
            tokenAmount={tokenTwoAmount}
            token={tokenTwo}
            openTokenSelector={openModal}
            openTokenSelectorNumber={2}
            isRefreshLoading={isRefreshLoading}
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
