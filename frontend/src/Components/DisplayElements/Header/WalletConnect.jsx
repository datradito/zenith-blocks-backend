import React, { useEffect} from 'react'
import axios from 'axios';
import {
    useAccount,
    useDisconnect,
    useEnsAvatar,
    useEnsName,
    useBalance,
    useConnect,
    useNetwork,
} from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useNavigate } from 'react-router-dom';

import { useSignMessage } from 'wagmi';

export default function WalletConnect() {
    const navigate = useNavigate();
    const { address, connector, isConnected } = useAccount()
    const { data: ensAvatar } = useEnsAvatar({ address })
    const { data: ensName } = useEnsName({ address })
    const { data, isError, isLoading } = useBalance({
        address
    })
    const { signMessageAsync } = useSignMessage();
    const { disconnectAsync } = useDisconnect();
    const { connectAsync } = useConnect();
    const { chain } = useNetwork()

    useEffect(() => {
        const auth = sessionStorage.getItem('authToken');
        if (isConnected && !auth) {
            signInWithEthereum();
        } else if (!isConnected) {
            sessionStorage.removeItem('authToken');
            sessionStorage.removeItem('daoId');
            sessionStorage.removeItem('address');
        }
    }, [isConnected])

    const createSiweMessage = async () => {

        try {
            const userData = {
                network: "evm",
                address: address,  // Make sure 'address' is defined or provided in your code
                chain: chain?.id
            };

            const res = await axios.get(`http://localhost:8000/nonce`);
            const nonce = res.data;

            const { data } = await axios.post(`http://localhost:8000/siwe`, {
                address: userData.address,
                network: userData.network,
                nonce
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });

            return data;
        } catch (error) {
            console.error('Error handling authentication:', error);
            disconnectAsync();
            throw error; // Rethrow the error to signal that the function encountered an error
        }
    };

    const sendForVerification = async(message, signature) => {
        try {
            const response = await axios.post(
                `http://localhost:8000/verify`,
                { message, signature },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true, // Moved outside the 'headers' object
                }
            );

            return response.data;
        } catch (error) {
            console.error('Error during verification:', error);
            throw error; // Rethrow the error to signal that the function encountered an error
        }
    }

    async function signInWithEthereum() {
        try {
            const message = await createSiweMessage();

            if (!message) {
                console.log("No message received from createSiweMessage");
                return;
            }

            const signature = await signMessageAsync({message});

            if (!signature) {
                console.log("No signature received from signMessageAsync");
                return;
            }

            const res = await sendForVerification(message, signature);

            const { daoId, address} = decodeToken(res.authToken);

            sessionStorage.setItem('authToken', res.authToken);
            sessionStorage.setItem('daoId', daoId);
            sessionStorage.setItem('address', address);
            navigate(`/proposals`);
        } catch (error) {
            console.error("Error during sign-in:", error);
            disconnectAsync();
            sessionStorage.removeItem('authToken');
        }
    }

    function decodeToken(token) {
        if (!token) {
            return;
        }
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace("-", "+").replace("_", "/");
        return JSON.parse(window.atob(base64));
    }

    const testAuth = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/test`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
                
            });
            console.log(res.data);
        } catch (error) {
            console.error('Error handling authentication:', error);
            throw error; // Rethrow the error to signal that the function encountered an error
        }
    }



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
            {/* {
                isConnected && (
                    <>
                    <Button onClick={handleAuth}>Sign Out</Button>
                    // <Button onClick={checkSiwe}>Check siwe</Button> 
                    </>
                )
            } */}
        </div>
    );
}
