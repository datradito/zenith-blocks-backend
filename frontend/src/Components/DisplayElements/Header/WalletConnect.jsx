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

        console.log("Connect To Site Via Wallet");

        const userData = { network: "evm" };

 
        userData.address = address;
        userData.chain = connector.chains[0].id;
     
     
        console.log("Sending Connected Account and Chain ID to Moralis Auth API");

        const { data } = await axios.post("http://localhost:8000/siwe", { address, network: "evm"}, {
            headers: {
                "content-type": "application/json",
            },
        });

        console.log("Received Signature Request From Moralis Auth API");


        const signature = await signMessageAsync({ message: data });

        console.log(signature)
        console.log("Succesful Sign In, Redirecting to User Page");

        // const { url } = await signIn("credentials", {
        //     message,
        //     signature,
        //     redirect: false,
        //     callbackUrl: "/user",
        // });

        // push(url);
    };


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
                    <Button onClick={handleAuth}>Sign Out</Button>
                )
            }
        </div>
    );
}
