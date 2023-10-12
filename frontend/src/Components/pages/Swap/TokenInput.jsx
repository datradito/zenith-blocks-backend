import React, { useState } from "react";
import styled from "styled-components";
import { Box, IconButton } from "@mui/material";
import { ArrowDownOutlined, DownOutlined } from "@ant-design/icons";
import TextFieldAtom from "../../atoms/TextField/TextField";

const SwitchButton = styled(IconButton)`
  background-color: #3a4157;
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
  display: flex;
  border-radius: 8px;
  position: absolute;
  top: 65px;
  left: 180px;
  color: white;
  border: 3px solid #0e111b;
  font-size: 12px;
  transition: 0.3s;
  &:hover {
    background-color: #3a4157;
  }
`;

const InputsContainer = styled(Box)`
  position: relative;
`;

const AssetIcon = styled("div")({
  position: "absolute",
  minWidth: "50px",
  height: "30px",
  backgroundColor: "#3a4157",
  borderRadius: "0.8rem",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: "5px",
  fontWeight: "bold",
  fontSize: "17px",
  paddingRight: "8px",
  "&:hover": {
    cursor: "pointer",
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
      fontSize: 35,
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
    <InputsContainer>
      <TextFieldAtom
        config={tokenFieldConfig}
        value={tokenOneAmount || ""}
        onChange={onTokenAmountChange}
        InputProps={{
          min: "0",
        }}
      />
      <TextFieldAtom
        config={tokenFieldConfig}
        value={tokenTwoAmount || ""}
        InputProps={{
          readOnly: true,
        }}
      />
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

      <AssetIcon
        onClick={() => openTokenSelector(1)}
        style={{ top: "20px", right: "20px" }}
      >
        <AssetLogo src={tokenOne.img} alt="assetOneLogo" />
        {tokenOne.ticker}
        <DownOutlined />
      </AssetIcon>
      <AssetIcon
        onClick={() => openTokenSelector(2)}
        style={{ top: "103px", right: "20px" }}
      >
        <AssetLogo src={tokenTwo.img} alt="assetTwoLogo" />
        {tokenTwo.ticker}
        <DownOutlined />
      </AssetIcon>
    </InputsContainer>
  );
};

export default TokenInput;
