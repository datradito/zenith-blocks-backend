import React from "react";
import { Input, Select, CryptoLogos } from '@web3uikit/core';
import { Typography, Box } from "@mui/material";

function WalletInputs({ chain, wallet, setChain, setWallet }) {
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "1rem",
        }}>
            <Input 
                margin="dense"
                size="small"
                onChange={(e) => setWallet(e.target.value)}
                value={wallet}
                style={{  }}
            />
            <Select
                style={{width: "2rem"}}
                defaultOptionIndex={0} onChange={(e) => setChain(e.value)} value={chain} options={[
                { value: "0x1", label: "ETH", id: "ETH", prefix: <CryptoLogos chain="ethereum" /> },
                { value: "0x89", label: "Matic", id: "Matic", prefix: <CryptoLogos chain="polygon" /> },
            ]}
            />
        </Box>
    );
}

export default WalletInputs;