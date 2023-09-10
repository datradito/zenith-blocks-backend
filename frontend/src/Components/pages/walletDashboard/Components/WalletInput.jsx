import React from "react";
import { Typography, Box } from "@mui/material";
import {
    useAccount,
} from 'wagmi'

function WalletInputs({ chain, wallet, setChain, setWallet }) {

    const { address, connector, isConnected } = useAccount()


    if (isConnected) setWallet(address) && setChain(connector.chains[0].id)


    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "1rem",
        }}>
            {/* <Input 
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
            /> */}
        </Box>
    );
}

export default WalletInputs;