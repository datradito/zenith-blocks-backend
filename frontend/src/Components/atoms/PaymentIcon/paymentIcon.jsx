import React from 'react'
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

function CustomPaymentViewIcon() {
    const paymentIconStyles = {
        chipStyle: {
            padding: '0 .25rem',
            color: 'white',
            backgroundColor: '#242b33',
            fontSize: '0.75rem',
            '& .MuiSvgIcon-root': {
                color: '#1A65C0',
                fontSize: '0.75rem',
            },
        }
    }
    const handleClick = () => {
        console.info('You clicked the Chip.');
    };

    return (
        <Stack direction="row" spacing={1}>
            {/* <Chip icon={<DescriptionRoundedIcon />} label="With Icon" /> */}
            <Chip icon={<AccountBalanceWalletIcon />}
                label="PAY"
                onClick={handleClick}
                sx={paymentIconStyles.chipStyle}
            />
        </Stack>
    );
}

export default CustomPaymentViewIcon