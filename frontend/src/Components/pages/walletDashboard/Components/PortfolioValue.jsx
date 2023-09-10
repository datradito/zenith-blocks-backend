import { Typography, Box } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";

function PortfolioValue({ tokens, nativeValue }) {
    const [totalValue, setTotalValue] = useState(0);


    useEffect(() => {
        let val = 0;
        for (let i = 0; i < tokens.length; i++) {
            val = val + Number(tokens[i].val);
        }
        val = val + Number(nativeValue);

        setTotalValue(val.toFixed(2));
    }, [nativeValue, tokens]);

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start", 
            minHeight: "112px",
            gap: "1rem",
        }}>
            <Typography variant="h4">Portfolio Total Value</Typography>
            <Typography variant="subtitle2">Total Balance: ${totalValue}</Typography>
        </Box>
    );
}

export default PortfolioValue;