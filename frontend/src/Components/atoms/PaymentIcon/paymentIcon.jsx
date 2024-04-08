import React from "react";
import Chip from "@mui/material/Chip";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

const paymentIconStyles = {
  chipStyle: {
    color: "white",
    backgroundColor: "#242b33",
    "& .MuiSvgIcon-root": {
      color: "#1A65C0",
      fontSize: "0.75rem",
    },
  },
};
function CustomPaymentViewIcon({ label, ...props }) {
  return (
    <Chip
      icon={<AccountBalanceWalletIcon />}
      label={label}
      onClick={props?.onClick}
      sx={paymentIconStyles.chipStyle}
    />
  );
}

export default CustomPaymentViewIcon;
