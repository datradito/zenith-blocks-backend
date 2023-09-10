// import Moralis from "moralis";
import React, { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonAtom from '../../atoms/Button';
import axios from "axios";
import { useSendTransaction } from "wagmi";
import CustomizedSnackbars from '../../atoms/SnackBar/SnackBar';

const styles = {
    default: {
        mr: 2,
        minWidth: "100px",
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
            mr: 2,
        },
        '& .MuiSvgIcon-root': {
            color: 'white',
        },
    }
}

function User({ address, balance, symbol }) {
    const [executionError, setExecutionError] = useState(null);
    const [fromToken] = useState("0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE");
    const [toToken, setToToken] = useState(
        "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"
    ); //USDC ERC20 Contract
    const [value, setValue] = useState("1000000000000000000");
    const [valueExchanged, setValueExchanged] = useState("");
    const [valueExchangedDecimals, setValueExchangedDecimals] = useState(1e18);
    const [to, setTo] = useState("");
    const [txData, setTxData] = useState("");

    const [open, setOpen] = useState(false);

    // Add other state variables and event handlers as needed

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const { data, isLoading, isSuccess, sendTransaction } = useSendTransaction({
        request: {
            from: address,
            to: String(to),
            data: String(txData),
            value: String(value),
        },
    })


    function changeToToken(e) {
        setToToken(e.target.value);
        setValueExchanged("");
    }

    function changeValue(e) {
        setValue(e.target.value * 1E18);
        setValueExchanged("");
    }

    async function get1inchSwap() {

        try {
            const tx = await axios.get(`https://api.1inch.io/v4.0/137/swap?fromTokenAddress=${fromToken}&toTokenAddress=${toToken}&amount=${value}&fromAddress=${address}&slippage=5`);
            console.log(tx.data)
            setTo(tx.data.tx.to);
            setTxData(tx.data.tx.data);
            setValueExchangedDecimals(Number(`1E${tx.data.toToken.decimals}`));
            setValueExchanged(tx.data.toTokenAmount);
        } catch (error) {
            console.log(error);
            setExecutionError(error);
        }
    }

    //write useEffect to clear executionerror after 5 seconds
    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setExecutionError(null);
    //     }, 5000);
    //     return () => clearTimeout(timer);
    // }
    // , [executionError]);

    const swapButtonConfig = {
        onClick: handleOpen,
        label: "Swap",
        variant: "contained",
        innerText: "Swap",
        sx: {
            mt: 0,
            mb: 0,
            ml: 1,
            padding: "0.5rem 1rem",
            borderRadius: "50px",
            backgroundColor: "#055FFC",
            color: "#fff",
        }
    }

    const getConversionButtonConfig = {
        onClick: get1inchSwap,
        label: "Get Conversion",
        variant: "contained",
        innerText: "Get Conversion",
        sx: {
            mt: 0,
            mb: 0,
            ml: 1,
            padding: "0.5rem 1rem",
            borderRadius: "50px",
            backgroundColor: "#055FFC",
            color: "#fff",
        }
    }

    const executeSwapButtonConfig = {
        onClick: sendTransaction,
        label: "Execute Swap",
        variant: "contained",
        innerText: "Execute Swap",
        disabled: valueExchanged ? false : true,
        sx: {
            mt: 0,
            mb: 0,
            ml: 1,
            padding: "0.5rem 1rem",
            borderRadius: "50px",
            backgroundColor: "#055FFC",
            color: "#fff",
        }
    }

    return (
        <>
            <ButtonAtom config={swapButtonConfig} />
            {/* {executionError ? <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, minWidth: 400 }}><CustomizedSnackbars message="Something went wrong!" severity="error" autoOpen={true} /> </Box> : */}
                <Modal
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="swap-modal-title"
                    aria-describedby="swap-modal-description"
                >
                    <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'lightgrey', borderRadius: "50px", boxShadow: 24, p: 4, minWidth: 400 }}>
                        <Typography id="swap-modal-title" variant="h6" component="h2" gutterBottom>
                            Address: {address}
                        </Typography>
                        <Typography variant="subtitle2" gutterBottom>
                            Your {symbol} Balance: {balance}
                        </Typography>
                        <Select
                        value={fromToken}
                        defaultValue='MATIC'
                            // labelId="toToken"
                            // id="toToken"
                            // value={toToken}
                            // label="toToken"
                            // onChange={(e) => changeToToken(e)}
                            sx={styles.default}
                        >
                            <MenuItem value="0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE">MATIC</MenuItem>

                        </Select>
                        <TextField
                            onChange={(e) => changeValue(e)}
                            value={value / 1e18}
                            type="number"
                            min={0}
                            max={balance / 1e18}
                        />
                        <br />
                        <br />

                        <Select
                            id="toToken"
                            value={toToken}
                            
                            onChange={(e) => changeToToken(e)}
                            sx={styles.default}
                        >
                            <MenuItem value="0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619">WETH</MenuItem>
                            <MenuItem value="0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174">USDC</MenuItem>
                            <MenuItem value="0xc2132D05D31c914a87C6611C10748AEb04B58e8F">USDT</MenuItem>
                        </Select>
                        <TextField
                            value={!valueExchanged ? '' : (valueExchanged / valueExchangedDecimals).toFixed(5)}
                            disabled={true}
                        />
                        <br />
                        <br />
                        <ButtonAtom config={getConversionButtonConfig} />
                        <ButtonAtom config={executeSwapButtonConfig} />
                        {isLoading && <div>Check Wallet</div>}
                        {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
                        <br />
                        <br />
                        {/* <button onClick={() => signOut({ redirect: "/signin" })}>Sign out</button> */}
                    </Box>
                </Modal>
            {/* } */}
            
        </>
        // <div>
        //     <div>User: {address}</div>
        //     <div>Your Ethereum Balance: {(balance / 1e18).toFixed(3)}</div>
        //     <select>
        //         <option value="0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE">
        //             MATIC
        //         </option>
        //     </select>
        //     <input
        //         onChange={(e) => changeValue(e)}
        //         value={value / 1e18}
        //         type="number"
        //         min={0}
        //         max={balance / 1e18}
        //     ></input>
        //     <br />
        //     <br />
        //     <select name="toToken" value={toToken} onChange={(e) => changeToToken(e)}>
        //         <option value="0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619">WETH</option>
        //         <option value="0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174">USDC</option>
        //         <option value="0xc2132D05D31c914a87C6611C10748AEb04B58e8F">USDT</option>
        //     </select>
        //     <input
        //         value={
        //             !valueExchanged
        //                 ? ""
        //                 : (valueExchanged / valueExchangedDecimals).toFixed(5)
        //         }
        //         disabled={true}
        //     ></input>
        //     <br />
        //     <br />
        //     <button onClick={get1inchSwap}>Get Conversion</button>
        //     <button disabled={!valueExchanged} onClick={sendTransaction}>Swap Tokens</button>
        //     {isLoading && <div>Check Wallet</div>}
        //     {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
        //     <br />
        //     <br />
        //     {/* <button onClick={() => signOut({ redirect: "/signin" })}>Sign out</button> */}
        // </div>
    );
}

// export async function getServerSideProps(context) {
//     const session = await getSession(context);

//     if (!session) {
//         return {
//             redirect: {
//                 destination: "/signin",
//                 permanent: false,
//             },
//         };
//     }

//     await Moralis.start({ apiKey: 'QRAJheBLguWplEM7lgkJqWkqRqVmRAWfmexXmxpbDRaQmH5idZ40cmyrNt6V2YTo' });

//     const response = await Moralis.EvmApi.account.getNativeBalance({
//         address: session.user.address,
//         chain: 0x89,
//     });

//     return {
//         props: { user: session.user, balance: response.raw },
//     };
// }

export default User;