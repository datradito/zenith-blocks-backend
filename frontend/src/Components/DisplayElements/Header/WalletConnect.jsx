import React, { useEffect} from 'react'
import axios from 'axios';
import {
    useAccount,
    useDisconnect,
    useNetwork,
} from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useNavigate } from 'react-router-dom';
import { useError } from '../../../Routes/ErrorRouterProvider';
import { useSignMessage } from 'wagmi';

import { useDispatch } from 'react-redux';
import { setIsLoggedIn } from '../../../actions/createAuthAction';

const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

const clearAuthData = () => {
  sessionStorage.removeItem("authToken");
  sessionStorage.removeItem("address");
  sessionStorage.removeItem("daoId");
};

function decodeToken(token) {
    if (!token) {
      return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
}


export default function WalletConnect() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { handleError } = useError();
    const { address } = useAccount({
        onConnect: () => {
            const auth = sessionStorage.getItem('authToken');
            !auth && signInWithEthereum();
        },
        onDisconnect() {
          clearAuthData();
          dispatch(setIsLoggedIn(false));
          navigate(`/`);
        }
    })
    const { signMessageAsync } = useSignMessage();
    const { disconnectAsync } = useDisconnect();
    const { chain } = useNetwork()

    useEffect(() => {
      const auth = sessionStorage.getItem("authToken");
      if (!auth) {
        disconnectAsync();
        localStorage.clear();
      }
    }, []);

    const createSiweMessage = async () => {
      try {
        const userData = {
          network: "evm",
          address: address,
          chain: chain?.id,
        };
        const { data: nonce } = await axios.get(`${BASE_URL}/nonce`, {
          withCredentials: true,
        });
        const { data } = await axios.post(
          `${BASE_URL}/siwe`,
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
        throw error.response.data;
      }
    };

    const sendForVerification = async(message, signature) => {
        try {
            const response = await axios.post(
              `${BASE_URL}/verify`,
              { message, signature },
              {
                headers: {
                  "Content-Type": "application/json",
                },
                withCredentials: true, 
              }
            );

            return response.data;
        } catch (error) {
            throw error.response.data
        }
    }

    async function signInWithEthereum() {
        try {
            const message = await createSiweMessage();

          if (!message) {
              throw new Error("Error creating message");
            }

            const signature = await signMessageAsync({message});

          if (!signature) {
              throw new Error("Error signing message");
            }
            const res = await sendForVerification(message, signature);
            const { daoId, address} = decodeToken(res.authToken);

            sessionStorage.setItem('authToken', res.authToken);
            sessionStorage.setItem('daoId', daoId);
            sessionStorage.setItem('address', address);
            
            dispatch(setIsLoggedIn(true))
            navigate(`/proposals`);
        } catch (error) {
            handleError({ type: "error", message: error.message });
            disconnectAsync();
            dispatch(setIsLoggedIn(false));
            clearAuthData();
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
        </div>
    );
}
