import { useState } from "react";
import NativeTokens from "./Components/NativeTokens";
import Tokens from "./Components/Tokens";
import TransferHistory from "./Components/TransferHistory";
import PortfolioValue from "./Components/PortfolioValue";
import Avatar from '@mui/material/Avatar';
import { NavLink } from "react-router-dom";
import { Box, Typography } from "@mui/material";

import {
    useAccount,
    useNetwork,
    useEnsAvatar,
} from 'wagmi'
function Dashboard() {

    const { address } = useAccount();
    const [activeTab, setActiveTab] = useState('tokens');
    const { chain: networkChain } = useNetwork();

   const { data } = useEnsAvatar({
     address: address,
     cacheTime: 2_000,
   });
    const [wallet, setWallet] = useState("");
    const [chain, setChain] = useState(networkChain?.id);
    const [nativeBalance, setNativeBalance] = useState(0);
    const [nativeValue, setNativeValue] = useState(0);
    const [tokens, setTokens] = useState([]);
    const [transfers, setTransfers] = useState([]);

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

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
                            <Avatar sx={{ width: 50, height: 50, marginRight: "1rem" }} src={data} />
                            <br />
                            <Typography variant="subtitle2">{`${wallet.slice(0, 6)}...${wallet.slice(36)}`}</Typography>
                            </div>
                            <PortfolioValue
                                nativeValue={nativeValue}
                                tokens={tokens}
                            />
                        </>
                    )}
                {/* <WalletInputs
                    chain={chain}
                    setChain={setChain}
                    wallet={wallet}
                    setWallet={setWallet}
                /> */}

            </Box>
            <Box
                sx={{
                    width: '100%',
                    borderBottom: '1px solid white',
                    padding: '1rem 0 1rem 0',
                }}
            > 
                <NavLink
                    style={{
                        textDecoration: "none",
                        color: "white",
                        paddingTop: "1rem",
                    }}
                    sx={{
                        color: 'white',
                        textTransform: 'capitalize',
                        display: 'block'
                    }}
                    onClick={() => handleTabClick('tokens')}
                >
                    Tokens
                </NavLink>
                <NavLink
                    style={{
                        textDecoration: "none",
                        color: "white",
                        paddingLeft: "1rem",
                        paddingTop: "1rem",
                    }}
                    sx={{ color: 'white', textTransform: 'capitalize', display: 'block' }}
                    onClick={() => handleTabClick('transfers')}
                >
                    Transaction History
                </NavLink>
            </Box>

            <Box style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                flexWrap: "wrap",
                marginTop: "2rem",
            }}>
                <Box>
                    {activeTab === "tokens" && (
                        <Box
                            // tabKey={1}
                            // tabName={"Tokens"}
                        >
                            <NativeTokens
                                wallet={wallet}
                                chain={chain}
                                nativeBalance={nativeBalance}
                                setNativeBalance={setNativeBalance}
                                nativeValue={nativeValue}
                                setNativeValue={setNativeValue}
                            />
                            <Tokens
                                wallet={address}
                                chain={chain}
                                tokens={tokens}
                                setTokens={setTokens} />
                        </Box>
                        )
                    }
                    {activeTab === "transfers" && (
                        <Box
                            // tabKey={2}
                            // tabName={"Transfers"}
                        >
                            <TransferHistory
                                chain={chain}
                                wallet={wallet}
                                transfers={transfers}
                                setTransfers={setTransfers}
                            />
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
}

export default Dashboard;
