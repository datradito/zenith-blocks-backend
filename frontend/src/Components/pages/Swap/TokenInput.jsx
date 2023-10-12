import React, { useState } from "react";
import styled from "styled-components";
import { Box, IconButton } from "@mui/material";
import { ArrowDownOutlined, DownOutlined } from "@ant-design/icons";
import Input from "../../atoms/Input/Input";
import FormRow from "../../atoms/FormRow/FormRow";
import Container from "../../atoms/Container/Container";
import Label from "../../atoms/Label/Label";

const SwitchButton = styled(IconButton)`
  background-color: #3a4157;
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
  display: flex;
  border-radius: 8px;
  color: white;
  border: 3px solid #0e111b;
  font-size: 12px;
  transition: 0.3s;
  &:hover {
    background-color: #3a4157;
  }
`;


const AssetIcon = styled("div")({
  borderRadius: "0.8rem",
  gap: "5px",
  paddingRight: "8px",
  minWidth: "8rem",
  minHeight: "2.5rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "&:hover": {
    cursor: "pointer",
    backgroundColor: "#1f2639",
  },
});

const AssetLogo = styled("img")({
  height: "22px",
  marginLeft: "5px",
});

const tokenFieldConfig = {
  id: "outlined-basic",
  variant: "outlined",
  sx: {
    "& .MuiInputBase-root": {
      border: "none",
    },
    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none",
      borderRadius: "none",
    },
    "& .MuiInputBase-input": {
      color: "white",
      backgroundColor: "#1f2639",
      borderWidth: 0,
      height: 40,
      borderRadius: 12,
      fontSize: "35px",
      outline: "none",
      marginBottom: 1,
    },
    '& input[type="number"]::-webkit-inner-spin-button, & input[type="number"]::-webkit-outer-spin-button':
      {
        "-webkit-appearance": "none",
        margin: 0,
      },
  },
  placeholder: "0",
  type: "number",
};

const TokenInput = ({
  tokenOneAmount,
  tokenTwoAmount,
  tokenOne,
  tokenTwo,
  onTokenAmountChange,
  switchTokens,
  openTokenSelector,
}) => {
  const [hovered, setHovered] = useState(false);
  const handleHover = () => {
    setHovered(!hovered);
  };
  return (
    <Container
      style={{
        border: "none",
        borderRadius: "0.5rem",
      }}
    >
      <FormRow
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.5rem",
          flexDirection: "row",
          borderRadius: "0.5rem",
          border: "none",
          minHeight: "5rem",
          minWidth: "15rem",
          backgroundColor: "#06070A",
        }}
      >
        <Container style={{
          border: "none",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}>
          <Label>Test</Label>
          <Input
            type="number"
            placeholder="0"
            value={tokenOneAmount || ""}
            onChange={onTokenAmountChange}
            style={{
              border: "none",
              minWidth: "5rem",
              minHeight: "2rem",
              background: "transparent",
            }}
          />
          <Label>Test</Label>
        </Container>
        <AssetIcon onClick={() => openTokenSelector(1)}>
          <AssetLogo src={tokenOne.img} alt="assetOneLogo" />
          {tokenOne.ticker}
          <DownOutlined />
        </AssetIcon>
      </FormRow>
      {/* <TextFieldAtom
        config={tokenFieldConfig}
        value={tokenTwoAmount || ""}
        InputProps={{
          readOnly: true,
        }}
      >
        <AssetIcon
          onClick={() => openTokenSelector(2)}
          style={{ top: "103px", right: "20px" }}
        >
          <AssetLogo src={tokenTwo.img} alt="assetTwoLogo" />
          {tokenTwo.ticker}
          <DownOutlined />
        </AssetIcon>
      </TextFieldAtom> */}
      <SwitchButton
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
        style={{ transition: "transform 0.2s" }}
        onClick={switchTokens}
      >
        <ArrowDownOutlined
          style={{
            transform: hovered ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s",
          }}
        />
      </SwitchButton>
      <FormRow>
        <Label
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0.5rem",
          }}
        >
          <Input
            type="number"
            placeholder="0"
            value={tokenOneAmount || ""}
            onChange={onTokenAmountChange}
          />
          <AssetIcon
            onClick={() => openTokenSelector(1)}
            style={{ top: "20px", right: "20px" }}
          >
            <AssetLogo src={tokenOne.img} alt="assetOneLogo" />
            {tokenOne.ticker}
            <DownOutlined />
          </AssetIcon>
        </Label>
      </FormRow>
    </Container>
  );
};

export default TokenInput;


//atom - smallest unit that can be used