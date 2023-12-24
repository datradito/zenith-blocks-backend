import React, { useState, useEffect } from "react";
import { message } from "antd";
import { useAccount, useSendTransaction, useWaitForTransaction } from "wagmi";
import useTokenBalances from "../../hooks/Swap/useTokenBalances";
import styled from "styled-components";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import TokenSelectorModal from "./TokenSelectorModal";
import SettingsPopover from "./SettingsPopOver";
import SwapButton from "./SwapButton";
import tokenList from "../../../Utility/tokenList";
import RefreshIcon from "@mui/icons-material/Refresh";
import axios from "axios";
import ToToken from "./ToToken";
import FromToken from "./FromToken";
import SwapLayout from "../../molecules/Swap/SwapLayout";
import Button from "../../atoms/Button/Button";
import useGetTokensPrices from "../../hooks/Swap/useGetTokensPrices";
import useCheckAllowance from "../../hooks/Swap/useCheckAllowance";

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
  const { tokenBalance } = useTokenBalances(tokenOne);


  const {
    data: tokenPrices,
    isLoading: isPriceLoading,
  } = useGetTokensPrices([tokenOne.address, tokenTwo.address], fetchPrice);

  const {
    data: allowance,
    isLoading: isAllowanceLoading,
    checkAllowance
  } = useCheckAllowance(tokenOne.address, address);

  if (isAllowanceLoading) {
    messageApi.open({
      type: "loading",
      content: "Loading Allowance...",
      duration: 2.5,
    });
  }

  useEffect(() => {
    if (tokenPrices) {
      setRatio(
        tokenPrices?.[tokenOne.address] / tokenPrices?.[tokenTwo.address]
      );
    }
  }, [tokenPrices, fetchPrice, tokenOne, tokenTwo, isPriceLoading]);
  
  function changeAmount(e) {
    setTokenOneAmount(e.target.value);
    if (isPriceLoading) {
      messageApi.open({
        type: "loading",
        content: "Loading...",
        duration: 2.5,
      });
    }
    if (
      e.target.value !== "" &&
      ratio
    ) {
      setTokenTwoAmount((e.target.value * ratio).toFixed(2));
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
      messageApi.open({
        type: "error",
        content: error.message,
        duration: 1.5,
      });
    },
  });

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  if (isLoading) {
    messageApi.open({
      type: "loading",
      content: "Transaction is Pending...",
      duration: 0,
    });
  }

  if (isSuccess) {
    messageApi.open({
      type: "success",
      content: "Transaction Successful",
      duration: 1.5,
    });
  }
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

  async function checkTokenAllowance() {
    try {
      const allowance = await checkAllowance();
      return allowance;
    } catch (error) {
      messageApi.open({
        type: "error",
        content: error.message,
        duration: 1.5,
      });
    }
  }

  async function generateSwapTransaction() {
    try {
      const swap = await axios.get(`${process.env.REACT_APP_API_URL}/swap`, {
        params: {
          tokenOneAddress: tokenOne.address,
          tokenTwoAddress: tokenTwo.address,
          tokenOneAmount: tokenOneAmount,
          slippage: slippage,
        },
      });
      return swap;
    } catch (error) {
      console.log(error);
    }
  }

  async function approveAllowance() {
    const allowance = await checkTokenAllowance();
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
      setTxDetails((prevTxDetails) => ({
        ...prevTxDetails,
        to: approve.data.to,
        data: approve.data.data,
        value: approve.data.value,
      }));
      return;
    }
  }

  async function fetchDexSwap() {
    if (tokenOneAmount === null || tokenOneAmount === 0) {
      messageApi.open({
        type: "error",
        content: "Please enter a valid amount",
        duration: 1.5,
      });
      return;
    }

    if (tokenOneAmount > tokenBalance) {
      messageApi.open({
        type: "error",
        content: "Insufficient Balance",
        duration: 1.5,
      });
      return;
    }

    if (tokenOneAmount < 0.01) {
      messageApi.open({
        type: "error",
        content: "Minimum amount is 0.01",
        duration: 1.5,
      });
      return;
    }

    await approveAllowance();
    const tx = await generateSwapTransaction();

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
    <SwapLayout>
      {contextHolder}
      <TokenSelectorModal
        isOpen={isOpen}
        closeModal={handleCloseModal}
        tokenList={tokenList}
        modifyToken={modifyToken}
      />
      <SwapLayout.TradeBox>
        <SwapLayout.TradeBoxHeader>
          <StyledRefreshIcon onClick={handleRefresh} />
          <SettingsPopover
            slippage={slippage}
            handleSlippageChange={handleSlippageChange}
          />
        </SwapLayout.TradeBoxHeader>
        <SwapLayout.SwapMain>
          <FromToken
            tokenAmount={tokenOneAmount}
            setTokenOneAmount={setTokenOneAmount}
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
        </SwapLayout.SwapMain>
        <SwapButton
          tokenOneAmount={tokenOneAmount}
          isConnected={isConnected}
          fetchDexSwap={fetchDexSwap}
        />
      </SwapLayout.TradeBox>
    </SwapLayout>
  );
}

export default Swap;
