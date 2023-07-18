import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';

export default function BasicDateField({ label }) {
    const dateStyles = {
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        flexDirection: "column",
        mt: "1rem",
        color: 'white',
        border: ".05rem #2c2c2c solid",
        borderRadius: '5px',
        '& .MuiInputBase-input': {
            padding: '0.5rem',
            border: '0px',
            color: 'white',
            fontSize: '.85rem',
            fontWeight: 'small',
        },
        '& .MuiInputBase-root': {
            border: '0px',
        },

    };
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateField sx={dateStyles} label={label} />
        </LocalizationProvider>
    );
}
