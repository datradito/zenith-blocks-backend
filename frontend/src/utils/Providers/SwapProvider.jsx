import React, { createContext, useState, useEffect, useCallback } from "react";
import tokenList from "../tokenList.json";
import useGetTokensPrices from "../../Components/hooks/Swap/useGetTokensPrices";
import { message } from "antd";
import { useAccount } from "wagmi";
export const SwapContext = createContext();

const SwapProvider = ({ children }) => {
  const [slippage, setSlippage] = useState(2.5);
  const [tokenOneAmount, setTokenOneAmount] = useState(0);
  const [tokenTwoAmount, setTokenTwoAmount] = useState(0);
  const [tokenOne, setTokenOne] = useState(tokenList[0]);
  const [tokenTwo, setTokenTwo] = useState(tokenList[1]);
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
  const [tokens, setTokens] = useState(tokenList);
  const [messageApi, contextHolder] = message.useMessage();
  const { address } = useAccount();

  const { data: tokenPrices, isLoading: isPriceLoading } = useGetTokensPrices([
    tokenOne.address,
    tokenTwo.address,
  ]);

  const findToken = (token) => {
    return tokenList[token];
  };

  const modifyToken = useCallback(
    (token) => {
      const newToken = findToken(token);
      setRatio(null);
      setTokenOneAmount(null);
      setTokenTwoAmount(null);
      if (changeToken === 1) {
        setTokenOne(newToken);
      } else {
        setTokenTwo(newToken);
      }
      setIsOpen(false);
    },
    [
      setRatio,
      setTokenOneAmount,
      setTokenTwoAmount,
      setTokenOne,
      setTokenTwo,
      setIsOpen,
      changeToken,
    ]
  );

  useEffect(() => {
    setRatio(tokenPrices?.[tokenOne.address] / tokenPrices?.[tokenTwo.address]);
  }, [tokenPrices, tokenOne, tokenTwo, isPriceLoading, modifyToken]);

  const openModal = (asset) => {
    setChangeToken(asset);
    setIsOpen(true);
  };

  useEffect(() => {}, [isPriceLoading]);

  const closeModal = () => {
    setIsOpen(false);
  };

  async function switchTokens() {
    setIsRefreshLoading(true);
    const newTokenOneAmount = tokenTwoAmount;
    setTokenOneAmount(newTokenOneAmount);
    const one = tokenOne;
    const two = tokenTwo;
    setTokenOne(two);
    setTokenTwo(one);
    if (tokenPrices) {
      setTokenTwoAmount(
        (
          (newTokenOneAmount * tokenPrices?.[tokenTwo.address]) /
          tokenPrices?.[tokenOne.address]
        ).toFixed(2)
      );
      setIsRefreshLoading(false);
    } else {
      setIsRefreshLoading(false);
    }
  }

  return (
    <SwapContext.Provider
      value={{
        slippage,
        tokens,
        tokenList,
        tokenOneAmount,
        tokenTwoAmount,
        tokenOne,
        tokenTwo,
        isOpen,
        changeToken,
        ratio,
        txDetails,
        isRefreshLoading,
        hovered,
        setSlippage,
        setTokens,
        setTokenOneAmount,
        setTokenTwoAmount,
        setTokenOne,
        setTokenTwo,
        setIsOpen,
        setChangeToken,
        setRatio,
        setTxDetails,
        setIsRefreshLoading,
        setHovered,
        openModal,
        closeModal,
        modifyToken,
        switchTokens,
        messageApi,
        address,
      }}
    >
      {contextHolder}
      {children}
    </SwapContext.Provider>
  );
};

export default SwapProvider;
