import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function StatusChip({ status }) {
    
    console.log(status)
    const chipStyle = {
        backgroundColor: status === 'PAID' ? '#0F2D20' : '#472B2B',
        padding: '0.5rem',
        color: status === 'PAID' ? '#20CE6F' : '#FC4F4F',
    }
    return (
        <Stack direction="row" spacing={1}>
            <Chip label= {status === 'PAID' ? "PAID" : "UNPAID"} sx={chipStyle} />
        </Stack>
    );
}
