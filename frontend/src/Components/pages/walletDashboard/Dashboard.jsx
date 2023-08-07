// import "./Dashboard.css";
import { useState } from "react";
import NativeTokens from "./Components/NativeTokens";
import Tokens from "./Components/Tokens";
import TransferHistory from "./Components/TransferHistory";
import WalletInputs from "./Components/WalletInput";
import PortfolioValue from "./Components/PortfolioValue";
import { Avatar, TabList, Tab } from '@web3uikit/core';
import { Box, Typography } from "@mui/material";

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
                                <Avatar isRounded size={100} avatarBackground="blue" theme="image" />
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
                <TabList>
                    <Tab tabKey={1} tabName={"Tokens"}>
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
                    </Tab>
                    <Tab tabKey={2} tabName={"Transfers"}>
                        <TransferHistory
                            chain={chain}
                            wallet={wallet}
                            transfers={transfers}
                            setTransfers={setTransfers}
                        />
                    </Tab>
                </TabList>
            </Box>
        </Box>
    );
}

export default Dashboard;
