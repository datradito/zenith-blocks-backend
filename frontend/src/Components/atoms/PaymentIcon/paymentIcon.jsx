import React from 'react'
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
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
function CustomPaymentViewIcon({ invoiceId }) {

    const handleClick = () => {
        console.info('You clicked the Chip.');
    };

    return (
        <Stack direction="row" spacing={1}>
            <Link to={`/invoice/${invoiceId}/payment`}>
            <Chip icon={<AccountBalanceWalletIcon />}
                label="PAY"
                onClick={handleClick}
                sx={paymentIconStyles.chipStyle}
                />
            </Link>
        </Stack>
    );
}

export default CustomPaymentViewIcon