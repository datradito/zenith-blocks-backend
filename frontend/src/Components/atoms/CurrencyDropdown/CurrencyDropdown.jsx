import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const currencies = [
    {
        value: "USD",
        label: "$"
    },
    {
        value: "EUR",
        label: "€"
    },
    {
        value: "BTC",
        label: "฿"
    },
    {
        value: "JPY",
        label: "¥"
    }
];

export default function CurrencyDropdown({ onChange, value, sx }) {
    
    const currencyColors = {
        border: '2px solid #2C2C2C',
        color: 'white',
        '& .MuiTableCell-root': {
            color: 'white',
            backgroundColor: '#2C2C2C',
            fontSize: '0.85rem',
        },
        '& .MuiInputBase-root': {
            fontSize: '.85rem',
        },
        '& .MuiSelect-root': {
            fontSize: '.85rem',
        },
        '& .MuiSvgIcon-root': {
            color: 'white',
        },
    }
    return (
        <Box
            sx={{
                "& .MuiTextField-root": { width: '200px', color: "white" }
            }}
        >
                <TextField
                    id="outlined-select-currency"
                    onChange={onChange}
                    select
                    defaultValue={value}
                    sx={[sx , currencyColors]}
                >
                    {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value} color="white">
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </Box>
    );
}
