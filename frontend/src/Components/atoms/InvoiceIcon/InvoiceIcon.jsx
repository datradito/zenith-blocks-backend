import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';


export default function CustomInvoiceViewIcon() {

    const invoiceIconStyles = {
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
            <Chip icon={<DescriptionRoundedIcon />}
                label="INVOICE"
                onClick={handleClick}
                sx = {invoiceIconStyles.chipStyle}
            />
        </Stack>
    );
}
