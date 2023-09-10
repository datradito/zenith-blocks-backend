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
import { useError } from '../../../Routes/ErrorRouterProvider';
import { useSignMessage } from 'wagmi';


const clearAuthData = () => {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('address');
    sessionStorage.removeItem('daoId');
};


export default function WalletConnect() {
    const navigate = useNavigate();
    const { handleError } = useError();
    const { address } = useAccount({
        onConnect: () => {
            const auth = sessionStorage.getItem('authToken');
            !auth && signInWithEthereum();
        },
        onDisconnect() {
            clearAuthData();
            localStorage.clear();
            navigate(`/`);
            handleError({ error: "success", message: "User disconnected" })
        }
    })
    const { data: ensAvatar } = useEnsAvatar({ address })
    const { data: ensName } = useEnsName({ address })
    const { data:balance, isError: balanceError, isLoading: balanceLoading } = useBalance({
        address
    })
    const { signMessageAsync } = useSignMessage();
    const { disconnectAsync } = useDisconnect();
    const { connectAsync , isSuccess:connectSuccess, status } = useConnect();
    const { chain } = useNetwork()


    //console.log("WalletConnect", { address, connector, isConnected, ensAvatar, ensName, balance, balanceError, balanceLoading, chain, connectSuccess, status })

    // useEffect(() => {
    //     const auth = sessionStorage.getItem('authToken');
    //     if (!auth) {
    //         disconnectAsync();
    //         localStorage.clear();
    //     }
    // }, [])

    const createSiweMessage = async () => {

        try {
            const userData = {
                network: "evm",
                address: address,  // Make sure 'address' is defined or provided in your code
                chain: chain?.id
            };

            const res = await axios.get(`${process.env.REACT_APP_API_URL}/nonce`);
            const nonce = res.data;

            const { data } = await axios.post(
              `${process.env.REACT_APP_API_URL}/siwe`,
              {
                address: userData.address,
                network: userData.network,
                nonce,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
                withCredentials: true,
              }
            );

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
              `${process.env.REACT_APP_API_URL}/verify`,
              { message, signature },
              {
                headers: {
                  "Content-Type": "application/json",
                },
                withCredentials: true, // Moved outside the 'headers' object
              }
            );

            return response.data;
        } catch (error) {
            console.error('Error during verification:', error.response.data);
            throw error; // Rethrow the error to signal that the function encountered an error
        }
    }

    async function signInWithEthereum() {
        try {
            const message = await createSiweMessage();

            if (!message) {
                handleError({ error: "error", message: "Error creating message" });
                return;
            }

            const signature = await signMessageAsync({message});

            if (!signature) {
                handleError({ error: "error", message: "Error signing message" });
                return;
            }
            const res = await sendForVerification(message, signature);
            const { daoId, address} = decodeToken(res.authToken);

            sessionStorage.setItem('authToken', res.authToken);
            sessionStorage.setItem('daoId', daoId);
            sessionStorage.setItem('address', address);
            handleError({ error: "success", message: "User successfully connected" });
            navigate(`/`);
        } catch (error) {
            handleError({ error: "error", message: "Error signing message" });
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
        </div>
    );
}
