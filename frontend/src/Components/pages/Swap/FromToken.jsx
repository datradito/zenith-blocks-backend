import React, { useEffect } from "react";
import AssetLogo from "../../molecules/Swap/AssetLogo";
import Label from "../../atoms/Label/Label";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import StyledIcon from "../../atoms/StyledIcon/StyledIcon";
import TokenInput from "../../molecules/Swap/TokenInput";
import TokenCardLayout from "../../molecules/Swap/TokenCardLayout";

import useTokenBalances from "../../hooks/Swap/useTokenBalances";

const FromToken = ({
  tokenAmount,
  token,
  setFetchPrice,
  onTokenAmountChange,
  openTokenSelector,
  openTokenSelectorNumber,
}) => {
 
  const { tokenBalance } = useTokenBalances(token);

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
        <Label>
          <>Balance: {tokenBalance.toFixed(2)}</>
        </Label>
        <Label>You Sell</Label>
      </TokenCardLayout.TokenRow>
      <TokenCardLayout.TokenRow>
        <TokenInput
          value={tokenAmount || ""}
          onChange={onTokenAmountChange}
          type="number"
          onBlur={() => {setFetchPrice(true)}}
        />
        <StyledIcon
          onClick={() => openTokenSelector(openTokenSelectorNumber)}
          backgroundColor="#0E111B"
        >
          <AssetLogo src={token.img} alt="assetTwoLogo" />
          <Label
            style={{
              color: "white",
              fontSize: "1.2rem",
              fontWeight: "500",
            }}
          >
            {token.ticker}
          </Label>
          <KeyboardArrowDownIcon />
        </StyledIcon>
      </TokenCardLayout.TokenRow>
      <TokenCardLayout.TickerLabel>{token.ticker}</TokenCardLayout.TickerLabel>
    </TokenCardLayout>
  );
};

export default FromToken;
