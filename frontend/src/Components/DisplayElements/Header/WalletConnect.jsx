import React, { useEffect, useState } from 'react'
import Web3 from "web3";
import {
    IconButton,
    Typography,
    Menu,
    Avatar,
    Tooltip,
    Button,
} from '@mui/material';
import MyContract from "../../../contracts/MyContract.json";
import { Mainnet,useEtherBalance, useEthers } from '@usedapp/core'
import { formatEther } from '@ethersproject/units';



export default function WalletConnect() {

    //const { account, deactivate, activateBrowserWallet } = useEthers();

    const [userAddress, setUserAddress] = useState(null);
    const [isAllowed, setIsAllowed] = useState(false);
    const [state, setState] = useState({
    web3: null,
    contract: null,
    });


    useEffect(() => {
        const provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");
        async function template() {
        const web3 = new Web3(provider);
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = MyContract.networks[networkId];
        const contract = new web3.eth.Contract(
            MyContract.abi,
            deployedNetwork.address
        );
        setState({ web3: web3, contract: contract });
        }
        provider && template();
    }, [])

    useEffect(() => {
        async function isUserAllowed() {
            const { contract } = state;
            allowUser();
         const allowed = await contract.methods.isUserAllowed().call();
            setIsAllowed(allowed);
            console.log(allowed);
        //  localStorage.setItem({`User: ${userAddress, "isAllowed: ${isAllowed}"}`})
        }
        userAddress && isUserAllowed();
    }, [userAddress]);


    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                // request the user's Ethereum account address
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setUserAddress(accounts[0]);
                console.log(isAllowed);
            } catch (error) {
                console.error(error);
            }
        }
    }

    const allowUser = async() => {
        if (userAddress) {
            
            const { contract } = state;
            await contract.methods.setAddress().send({ from: "0x3213a735762A5ba3764838339628340AaA6172c8" });
            const addresses = contract.methods.getAddresses().call();
            addresses.then((result) => {
                console.log(result);
            })
            
        }

    }
    return (
        <>
            {
                userAddress ?
                    <>
                        <p>Your userAddress: {userAddress}</p>
                        <button onClick={allowUser}>Allow</button>
                    </>
                    :
                    <>

                <Tooltip title="Connect Wallet">
                    <IconButton sx={{ p: 0 }}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                        <Typography
                            variant="button"
                            noWrap
                            onClick={connectWallet}
                            sx={{
                                mr: 2,
                                paddingLeft: '.5rem',
                                display: { xs: 'none', md: 'flex' },
                                color: 'White',
                                textDecoration: 'none',
                            }}
                        >
                                    Connect Wallet
                        </Typography>
                    </IconButton>
                </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                // anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                // open={Boolean(anchorElUser)}
                // onClose={handleCloseUserMenu}
            >
                {/* {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))} */}
            </Menu>
            </>
            }
        </>
    );
}
