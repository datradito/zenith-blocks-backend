import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

function CustomActionIcon() {
    const ActionIconStyles = {
        padding: '.5rem',
        color: '#1A65C0',
        backgroundColor: '#242b33',
        borderRadius: '50%',
            '& .MuiSvgIcon-root': {
                color: '#1A65C0',
                fontSize: '0.75rem',
            },
    }
    const handleClick = () => {
        console.info('You clicked the Chip.');
    };

    return (
        <Stack direction="row" spacing={1}>
            {/* <Chip icon={<EditIcon />}
                onClick={handleClick}
                sx={ActionIconStyles.chipStyle}
            /> */}
            <EditIcon sx={ActionIconStyles} />
        </Stack>
    );
}

export default CustomActionIcon