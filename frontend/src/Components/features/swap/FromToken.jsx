import React, { useContext } from "react";
import AssetLogo from "../../molecules/Swap/AssetLogo";
import Label from "../../atoms/Label/Label";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import StyledIcon from "../../atoms/StyledIcon/StyledIcon";
import TokenInput from "../../molecules/Swap/TokenInput";
import TokenCardLayout from "../../molecules/Swap/TokenCardLayout";

import useTokenBalances from "../../hooks/Swap/useTokenBalances";
import { message } from "antd";
import MaxLabel from "../../molecules/Swap/MaxLabel";
import { SwapContext } from "../../../Utility/Providers/SwapProvider";

const FromToken = ({ isPriceLoading }) => {
  const {
    tokenOneAmount,
    setTokenOneAmount,
    tokenOne,
    ratio,
    setTokenTwoAmount,
    openModal,
    messageApi,
  } = useContext(SwapContext);
  const { tokenBalance } = useTokenBalances(tokenOne);

  const changeAmount = (e) => {
    if (e.target.value >= 0) {
      setTokenOneAmount(e.target.value);
    }
    if (isPriceLoading) {
      messageApi.open({
        type: "loading",
        content: "Loading...",
        duration: 2.5,
      });
    }
    if (e.target.value !== "" && e.target.value >= 0 && ratio) {
      setTokenTwoAmount((e.target.value * ratio).toFixed(2));
    } else {
      setTokenTwoAmount(null);
    }
  };

  return (
    <TokenCardLayout
      sx={{
        backgroundColor: "#1f2639",
      }}
    >
      <TokenCardLayout.TokenRow
        sx={{
          padding: "0.5rem",
        }}
      >
        <Label
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <>Balance: {tokenBalance.toFixed(2)}</>
          <MaxLabel
            onClick={() =>
              tokenBalance > 0
                ? setTokenOneAmount(tokenBalance?.toFixed(4) || 0)
                : message.error(
                    `You don't have any ` + tokenOne?.ticker + ` tokens!`
                  )
            }
          >
            MAX
          </MaxLabel>
        </Label>
        <Label>You Sell</Label>
      </TokenCardLayout.TokenRow>
      <TokenCardLayout.TokenRow>
        <TokenInput
          value={tokenOneAmount || ""}
          defaultValue={
            tokenOneAmount > 0 ? tokenOneAmount : tokenBalance.toFixed(4) || 0
          }
          onChange={changeAmount}
          type="number"
          onBlur={() => {}}
        />
        <StyledIcon onClick={() => openModal(1)} backgroundcolor="#2D5AF4">
          <AssetLogo src={tokenOne?.img} alt="assetTwoLogo" />
          <Label
            style={{
              color: "white",
              fontSize: "1.2rem",
              fontWeight: "500",
            }}
          >
            {tokenOne?.ticker}
          </Label>
          <KeyboardArrowDownIcon />
        </StyledIcon>
      </TokenCardLayout.TokenRow>
      <TokenCardLayout.TickerLabel>
        {tokenOne?.ticker}
      </TokenCardLayout.TickerLabel>
    </TokenCardLayout>
  );
};

export default FromToken;
