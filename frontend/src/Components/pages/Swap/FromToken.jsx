import React from "react";
import AssetLogo from "../../molecules/Swap/AssetLogo";
import Label from "../../atoms/Label/Label";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import StyledIcon from "../../atoms/StyledIcon/StyledIcon";
import TokenInput from "../../molecules/Swap/TokenInput";
import TokenCardLayout from "../../molecules/Swap/TokenCardLayout";

import useTokenBalances from "../../hooks/Swap/useTokenBalances";
import { message } from "antd";
import MaxLabel from "../../molecules/Swap/MaxLabel";

const FromToken = ({
  tokenAmount,
  setTokenOneAmount,
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
        <Label
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <>Balance: {tokenBalance.toFixed(2)}</>
          <MaxLabel
            onClick={() =>
              tokenBalance > 0 ?
                setTokenOneAmount(tokenBalance?.toFixed(4) || 0) :
                message.error(`You don't have any ` + token.ticker + ` tokens!`)
            }
          >
            MAX
          </MaxLabel>
        </Label>
        <Label>You Sell</Label>
      </TokenCardLayout.TokenRow>
      <TokenCardLayout.TokenRow>
        <TokenInput
          value={tokenAmount || ""}
          defaultValue={tokenAmount > 0 ? tokenAmount : tokenBalance.toFixed(4) || 0}
          onChange={onTokenAmountChange}
          type="number"
          onBlur={() => {
            setFetchPrice(true);
          }}
        />
        <StyledIcon
          onClick={() => openTokenSelector(openTokenSelectorNumber)}
          backgroundColor="#2D5AF4"
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
