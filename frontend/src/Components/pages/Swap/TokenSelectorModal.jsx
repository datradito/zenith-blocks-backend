import React from "react";
import Label from "../../atoms/Label/Label";
import { Modal, Paper, Typography, List, Box, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import styled from "styled-components";

const TokenLogo = styled("img")`
  height: 40px;
  width: 40px;
`;

const TokenName = styled(Label)`
  margin-left: 10px;
  font-size: "0.85rem";
  font-weight: 500;
  width: "100%";
`;

const TokenTicker = styled(Typography)`
  margin-left: 10px;
  font-size: 13px;
  font-weight: 300;
  color: grey;
`;
const TokenChoice = styled(Box)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  &:hover {
    cursor: pointer;
    background-color: #1f2639;
  }
  &:hover ${TokenName} {
    color: white;
  }
  &:hover ${TokenTicker} {
    color: white;
  }
`;

const TokenSelectorModal = ({ isOpen, closeModal, tokenList, modifyToken }) => {
  return (
    <Modal open={isOpen} onClose={closeModal}>
      <Paper
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "#0e111b",
          width: 400,
          outline: "none",
          p: 3,
        }}
        style={{ height: "500px", overflowY: "scroll"}}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Label
            style={{
              color: "white", 
              fontSize: "1.2rem",
            }}
          >
            Select a token
          </Label>
          <IconButton onClick={closeModal}>
            <Close
              sx={{
                "&:hover": {
                  backgroundColor: "#1f2639",
                },
                color: "white",
                padding: "4px",
                borderRadius: "15px",
              }}
            />
          </IconButton>
        </div>
        <List>
          {tokenList.map((token, i) => (
            <TokenChoice key={i} onClick={() => modifyToken(i)}>
              <TokenLogo src={token.img} alt={token.ticker} />
              <div>
                <TokenName>{token.name}</TokenName>
                <TokenTicker>{token.ticker}</TokenTicker>
              </div>
            </TokenChoice>
          ))}
        </List>
      </Paper>
    </Modal>
  );
};

export default TokenSelectorModal;
