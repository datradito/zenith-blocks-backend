import React from "react";
import AssetLogo from "../../molecules/Swap/AssetLogo";
import TokenInput from "../../molecules/Swap/TokenInput";
import Label from "../../atoms/Label/Label";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CircularIndeterminate from "../../atoms/Loader/loader";
import StyledIcon from "../../atoms/StyledIcon/StyledIcon";
import TokenCardLayout from "../../molecules/Swap/TokenCardLayout";


const ToToken = ({
  tokenAmount,
  token,
  openTokenSelector,
  openTokenSelectorNumber,
  isRefreshLoading,
}) => {


  return (
    <TokenCardLayout
      sx={{
        marginTop: "-2rem",
      }}
    >
      <TokenCardLayout.TokenRow>
        <p></p>
        <Label>
          You Buy
        </Label>
      </TokenCardLayout.TokenRow>
      <TokenCardLayout.TokenRow>
        {isRefreshLoading ? (
          <CircularIndeterminate
            styleProps={{
              border: "none",
            }}
          />
        ) : (
          <TokenInput defaultValue="0" value={tokenAmount || ""} readOnly />
        )}
        <StyledIcon
          onClick={() => openTokenSelector(openTokenSelectorNumber)}
          backgroundColor="#2D5AF4"
        >
            <AssetLogo src={token.img} alt="assetTwoLogo" />
            <Label
              style={{
                fontWeight: "500",
                color: "white",
                fontSize: "1.2rem",
              }}
            >
              {token.ticker}
            </Label>
          <KeyboardArrowDownIcon
            style={{
              color: "grey",
            }}
          />
        </StyledIcon>
      </TokenCardLayout.TokenRow>
      <TokenCardLayout.TickerLabel>{token.ticker}</TokenCardLayout.TickerLabel>
    </TokenCardLayout>
  );
};

export default ToToken;
