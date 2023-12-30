import React from "react";
import AssetLogo from "../../molecules/Swap/AssetLogo";
import TokenInput from "../../molecules/Swap/TokenInput";
import Label from "../../atoms/Label/Label";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CircularIndeterminate from "../../atoms/Loader/loader";
import StyledIcon from "../../atoms/StyledIcon/StyledIcon";
import TokenCardLayout from "../../molecules/Swap/TokenCardLayout";
import { useContext } from "react";
import { SwapContext } from "../../../Utility/Providers/SwapProvider";

const ToToken = () => {
  const { tokenTwoAmount, tokenTwo, isRefreshLoading, openModal } =
    useContext(SwapContext);
  return (
    <TokenCardLayout
      sx={{
        marginTop: "-2rem",
      }}
    >
      <TokenCardLayout.TokenRow>
        <p></p>
        <Label>You Buy</Label>
      </TokenCardLayout.TokenRow>
      <TokenCardLayout.TokenRow>
        {isRefreshLoading ? (
          <CircularIndeterminate
            styleprops={{
              border: "none",
            }}
          />
        ) : (
          <TokenInput defaultValue="0" value={tokenTwoAmount || ""} readOnly />
        )}
        <StyledIcon onClick={() => openModal(2)} backgroundcolor="#2D5AF4">
          <AssetLogo src={tokenTwo?.img} alt="assetTwoLogo" />
          <Label
            style={{
              fontWeight: "500",
              color: "white",
              fontSize: "1.2rem",
            }}
          >
            {tokenTwo?.ticker}
          </Label>
          <KeyboardArrowDownIcon
            style={{
              color: "grey",
            }}
          />
        </StyledIcon>
      </TokenCardLayout.TokenRow>
      <TokenCardLayout.TickerLabel>
        {tokenTwo?.ticker}
      </TokenCardLayout.TickerLabel>
    </TokenCardLayout>
  );
};

export default ToToken;