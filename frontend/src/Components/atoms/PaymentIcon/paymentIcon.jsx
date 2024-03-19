import React from 'react'
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';


    const paymentIconStyles = {
      chipStyle: {
        padding: "0 .25rem",
        color: "white",
        backgroundColor: "#242b33",
        fontSize: "0.75rem",
        "& .MuiSvgIcon-root": {
          color: "#1A65C0",
          fontSize: "0.75rem",
        },
      },
    };
function CustomPaymentViewIcon({ label , ...props}) {

    return (
        <Stack direction="row" spacing={1}>
            <Chip icon={<AccountBalanceWalletIcon />}
                label={label}
                onClick={props?.onClick}
                sx={paymentIconStyles.chipStyle}
                />
        </Stack>
    );
}

export default CustomPaymentViewIcon