import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Input from "../../atoms/Input/Input";
import Container from "../../atoms/Container/Container";
import Label from "../../atoms/Label/Label";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CircularIndeterminate from "../../atoms/Loader/loader";

const AssetIcon = styled("div")((props) => ({
  borderRadius: "0.8rem",
  border: "none",
  gap: "0.4rem",
  minWidth: "6rem",
  minHeight: "2.5rem",
  display: "flex",
  alignItems: "center",
  "&:hover": {
    cursor: "pointer",
    backgroundColor: props.AssetHoverColor,
  },
}));

const AssetLogo = styled("img")({
  height: "22px",
  marginLeft: "5px",
});

const TokenInput = ({
  tokenAmount,
  token,
  validationType,
  onTokenAmountChange,
  openTokenSelector,
  openTokenSelectorNumber,
  backgroundColor,
  tokenType,
  AssetHoverColor,
  isRefreshLoading,
  getUserTokenBalance,
}) => {
  const [tokenBalance, setTokenBalance] = useState(0);

  useEffect(() => {
    if (getUserTokenBalance) {
      console.log("token", token);
      const balance = getUserTokenBalance?.result?.tokenBalances?.filter(
        (tokenAddress) => {
          if (tokenAddress?.contractAddress === token?.address) {
            return tokenAddress?.tokenBalance;
          }
        }
      );
      console.log("getUserTokenBalance", getUserTokenBalance);
      console.log("balance", balance);
      if (balance?.length === 0) {
        setTokenBalance(0);
      } else {
        setTokenBalance(balance?.result?.tokenBalances[0]?.tokenBalance);
      }
    }
  }, [getUserTokenBalance, token?.address]);
  return (
    <Container
      style={{
        border: "none",
        borderRadius: "0.5rem",
        width: "100%",
      }}
    >
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: backgroundColor,
          borderRadius: "0.8rem",
          padding: "0 0.3rem 0 0",
        }}
      >
        <Container
          style={{
            margin: 0,
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Label
            style={{
              textAlign: "right",
              padding: "0.5rem 0 0 0.5rem",
              color: "grey",
              fontWeight: "500",
            }}
          >
            Balance: {tokenBalance}
          </Label>
          <Label
            style={{
              textAlign: "right",
              padding: "0.5rem 1rem 0 0",
              color: "grey",
              fontWeight: "500",
            }}
          >
            You {tokenType}
          </Label>
        </Container>
        <Container
          style={{
            border: "none",
            display: "flex",
            gap: "0.5rem",
            alignItems: "center",
            margin: "0rem",
            width: "100%",
          }}
        >
          {isRefreshLoading ? (
            <CircularIndeterminate
              styleProps={{
                width: "70%",
                height: "3rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "none",
                marginTop: 0,
              }}
            />
          ) : (
            <Input
              style={{
                background: "transparent",
                border: "none",
                width: "65%",
                fontSize: "1.5rem",
                fontWeight: "bold",
                flexGrow: "1",
              }}
              placeholder="0"
              value={tokenAmount || ""}
              onChange={onTokenAmountChange}
              readOnly={validationType === "readOnly" ? true : false}
            />
          )}
          <AssetIcon
            onClick={() => openTokenSelector(openTokenSelectorNumber)}
            AssetHoverColor={AssetHoverColor}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                padding: "0.2rem",
              }}
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
            </div>
            <KeyboardArrowDownIcon
              style={{
                color: "grey",
              }}
            />
          </AssetIcon>
        </Container>
        <Label
          style={{
            textAlign: "right",
            padding: "0 1rem 0.5rem 0",
            color: "grey",
            fontWeight: "500",
          }}
        >
          {token.ticker}
        </Label>
      </Container>
    </Container>
  );
};

export default TokenInput;
