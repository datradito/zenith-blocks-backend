// import "./Dashboard.css";
import { useState } from "react";
import NativeTokens from "./Components/NativeTokens";
import Tokens from "./Components/Tokens";
import TransferHistory from "./Components/TransferHistory";
import WalletInputs from "./Components/WalletInput";
import PortfolioValue from "./Components/PortfolioValue";
import Avatar from '@mui/material/Avatar';
// import { Avatar, TabList, Box } from '@web3uikit/core';
import { Link, NavLink, Outlet } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

import {
    useAccount,
    useConnect,
    useDisconnect,
    useNetwork,
    useEnsAvatar,
    useEnsName,
    useBalance
} from 'wagmi'

function Dashboard() {
    const address = sessionStorage.getItem('address');
    const ensAvatar = useEnsAvatar({
        address: address,
        cacheTime: 2_000,
    })
    const [wallet, setWallet] = useState("");
    const [chain, setChain] = useState("0x1");
    const [nativeBalance, setNativeBalance] = useState(0);
    const [nativeValue, setNativeValue] = useState(0);
    const [tokens, setTokens] = useState([]);
    const [transfers, setTransfers] = useState([]);


    return (
        <Box style={{
            color: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            maxWidth: "60%",
            margin: "0 auto",
            flexWrap: "wrap",
            marginTop: "6rem",
        }}>
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "space-between",
                width: "100%",
                paddingBottom: "2rem",
                borderBottom: "1px solid white",
            }}>
                    {wallet.length === 42 && (
                        <>
                            <div>
                            <Avatar sx={{ width: 50, height: 50, marginRight: "1rem" }} src={ensAvatar} />
                            <br />
                            <Typography variant="subtitle2">{`${wallet.slice(0, 6)}...${wallet.slice(36)}`}</Typography>
                            </div>
                            <PortfolioValue
                                nativeValue={nativeValue}
                                tokens={tokens}
                            />
                        </>
                    )}
                <WalletInputs
                    chain={chain}
                    setChain={setChain}
                    wallet={wallet}
                    setWallet={setWallet}
                />
            </Box>

            <Box style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                flexWrap: "wrap",
                marginTop: "2rem",
            }}>
                <NavLink to="transfer">Transfer History </NavLink>
                <NavLink to="tokens">Tokens </NavLink>
                <Box>
                    {/* <Outlet /> */}
                    <Box tabKey={1} tabName={"Tokens"}>
                        <NativeTokens
                            wallet={wallet}
                            chain={chain}
                            nativeBalance={nativeBalance}
                            setNativeBalance={setNativeBalance}
                            nativeValue={nativeValue}
                            setNativeValue={setNativeValue}
                        />
                        <Tokens
                            wallet={wallet}
                            chain={chain}
                            tokens={tokens}
                            setTokens={setTokens} />
                    </Box>
                    <Box tabKey={2} tabName={"Transfers"}>
                        <Link to="/transfer">Transaction History </Link>
                        
                        <TransferHistory
                            chain={chain}
                            wallet={wallet}
                            transfers={transfers}
                            setTransfers={setTransfers}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default Dashboard;
