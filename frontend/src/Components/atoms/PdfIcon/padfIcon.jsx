import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';


export default function CustomPDFViewIcon() {

    const pdfIconStyles = {
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
            <Chip icon={<PictureAsPdfIcon />}
                label="PDF"
                onClick={handleClick}
                sx={pdfIconStyles.chipStyle}
            />
        </Stack>
    );
}
