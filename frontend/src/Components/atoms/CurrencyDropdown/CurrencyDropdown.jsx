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

const currencyStyles = {
    backgroundColor: "#24292E",
    border: "1px solid #2C2C2C",
    color: "#24292E",
    "& .MuiTableCell-root": {
    color: "white",
    backgroundColor: "#24292E",
    fontSize: "0.85rem",
    },
    "& .MuiInputBase-root": {
    fontSize: ".85rem",
    padding: "0",
    },
    "& .MuiSelect-root": {
    fontSize: ".85rem",
    },
    "& .MuiSvgIcon-root": {
    color: "white",
    },
    padding: "0",
    borderRadius: "5px",

    "& .MuiInputBase-input": {
    padding: "0.5rem",
    color: "white",
    borderRadius: "5px",
    fontSize: ".85rem",
    fontWeight: "small",
    },
};

export default function CurrencyDropdown({ onChange, value, sx }) {
    
    return (
        <Box
            sx={{
                "& .MuiTextField-root": {  color: "white" }
            }}
        >
                <TextField
                    onChange={onChange}
                    select
                    defaultValue={value}
                    sx={[sx , currencyStyles]}
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
