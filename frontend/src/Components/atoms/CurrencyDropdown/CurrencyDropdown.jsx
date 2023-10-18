import * as React from "react";
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
    textAlign: "left",
    width: "100%",
    backgroundColor: "#24292E",
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

      "& ::hover" :{
    outline: "none",
    border: "0.08rem #2c2c2c solid"
  }
};

export default function CurrencyDropdown({ onChange, value, sx }) {
    
    return (
                <TextField
                    onChange={onChange}
                    select
                    defaultValue={value}
                    sx={currencyStyles}
                >
                    {currencies.map((option) => (
                        <MenuItem
                            key={option.value}
                            value={option.value}
                            color="white">
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
    );
}
