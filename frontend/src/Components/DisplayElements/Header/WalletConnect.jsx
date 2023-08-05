import React, { useEffect, useState } from 'react'
import axios from 'axios';
import RecentTransactions from '../../molecules/Wallet/RecentTransactions';
import {
    useAccount,
    useConnect,
    useDisconnect,
    useNetwork,
    useEnsAvatar,
    useEnsName,
    useBalance
} from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useNavigate } from 'react-router-dom';

import { useSignMessage } from 'wagmi';
import { Button } from '@mui/material';

export default function WalletConnect() {
    const navigate = useNavigate()
    const { address, connector, isConnected } = useAccount()
    const { data: ensAvatar } = useEnsAvatar({ address })
    const { data: ensName } = useEnsName({ address })
    const { data, isError, isLoading } = useBalance({
        address
    })
    const { signMessageAsync } = useSignMessage();


    const handleAuth = async () => {

        console.log(window.location.host)
        console.log(window.location.origin)
        try {
            console.log("Connect To Site Via Wallet");

            const userData = { network: "evm" };
            userData.address = address;
            userData.chain = connector.chains[0].id;

            console.log("Sending Connected Account and Chain ID to Moralis Auth API");

            const { data: message } = await axios.post("http://localhost:8000/siwe", { address, network: "evm" }, {
                headers: {
                    'Content-Type': 'application/json',
                    withCredntials: true,
                    credentials: 'include'
                },
            });

            console.log("Received Signature Request From Moralis Auth API");

            const signature = await signMessageAsync({ message });

            console.log(message, signature);

            const response = await axios.post("http://localhost:8000/verify", { message, signature }, {
                headers: {
                    'Content-Type': 'application/json',
                    withCredntials: true,
                    credentials: 'include'
                },
            });

            if (response.data) {
                navigate('/proposals');
            };

            // Handle the response or redirect as needed
            // For example:
            // navigate('/user');
        } catch (error) {
            console.error('Error handling authentication:', error);
        }
    };

    const checkSiwe = async () => {
        const { data } = await axios.get("http://localhost:8000/checkSiwe");
        console.log(data);
        
    }


    //     const provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");
    //     const web3 = new Web3(provider);


    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'flex-end',
                padding: 12,
            }}
        >
        {
            <ConnectButton
            accountStatus={{
                smallScreen: 'avatar',
                largeScreen: 'full',
            }}
            showBalance={{
                smallScreen: false,
                largeScreen: true,
            }}
            chainStatus={{
                smallScreen: "icon",
                largeScreen: "full",
            }}
            />
            }
            {
                isConnected && (
                    <>
                    <Button onClick={handleAuth}>Sign Out</Button>
                    <Button onClick={checkSiwe}>Check siwe</Button> 
                    </>
                )
            }
        </div>
    );
}
