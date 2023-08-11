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
    const navigate = useNavigate()
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
        const auth = getCookies('siwe');

        console.log(auth);
        if (isConnected && !auth) {
            signInWithEthereum();
        }
    }, [isConnected])


    function getCookies(key) {
        var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
        return b ? b.pop() : "";
    }

    // const siweCookieValue = getCookies('siwe');

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

            console.log("Received Signature Request From Moralis Auth API");
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

            //sessionStorage.setItem('authToken', res.data.authToken);
            sessionStorage.setItem('authenticated', response.data);
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

            console.log(message)

            const signature = await signMessageAsync({message});

            if (!signature) {
                console.log("No signature received from signMessageAsync");
                return;
            }

            const res = await sendForVerification(message, signature);

            console.log(res);
            console.log("Signature Received From Moralis Auth API");
        } catch (error) {
            console.error("Error during sign-in:", error);
            disconnectAsync();
        }
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
