import React, { useContext } from "react";
import axios from "axios";

import { UserContext } from "../../../Utility/Providers/UserProvider";
import { decodeToken, setAuthData, clearAuthData } from "../../../Utility/auth";
import { useAccountEffect } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useNavigate } from "react-router-dom";
import { useSignMessage } from "wagmi";

import { SiweMessage } from "siwe";
import { useDispatch } from "react-redux";
import { setIsLoggedIn } from "../../../actions/createAuthAction";
import { message } from "antd";

export default function WalletConnect() {
  const { signMessageAsync } = useSignMessage();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setUser, user } = useContext(UserContext);

  useAccountEffect({
    onConnect(data) {
      !user && signInWithEthereum(data);
    },
    onDisconnect() {
      clearAuthData();
      navigate(`/`);
    },
  });

  const createSiweMessage = async (address, chainId) => {
    try {
      const { data: nonce } = await axios.get(
        `${process.env.REACT_APP_API_URL}/nonce`,
        {
          withCredentials: true,
        }
      );
      const data = new SiweMessage({
        domain: window.location.host,
        address: address,
        statement: "Sign in with Ethereum to the app.",
        uri: window.location.origin,
        version: "1",
        chainId: chainId,
        nonce: nonce,
      });

      return data.prepareMessage();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const sendForVerification = async (message, signature) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/verify`,
        JSON.stringify({ message, signature }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

  async function signInWithEthereum(data) {
    try {
      let siweMessage = await createSiweMessage(data.address, data.chainId);
      if (!siweMessage) {
        throw new Error("Error creating message");
      }

      message.success({
        content: "Message created successfully",
        key: "messageCreated",
        duration: 1,
      });

      const signature = await signMessageAsync({
        message: siweMessage,
        onSuccess: () => {
          message.success({
            content: "Message signed successfully",
            key: "messageSigned",
            duration: 1,
          });
        },
        onError: (error) => {
          message.error({
            content: `❌ ${error.message}`,
            key: "signMessageError",
            duration: 1,
            onClose: () => {
              message.destroy("signMessageError");
            }
          })
        }
      });

      const resPromise = sendForVerification(siweMessage, signature);
      message.loading({
        content: "Verifying signature...",
        key: "verifySignature",
      });

      resPromise
        .then((res) => {
          message.destroy("verifySignature");
          message.success({
            content: "Signature verified successfully",
            key: "verifySignatureSuccess",
            duration: 1,
            onClose: () => {
              const { daoId, address } = decodeToken(res.authToken);
              setAuthData(address, res.authToken, daoId);
              dispatch(setIsLoggedIn(true));
              const user = decodeToken(res.authToken);
              setUser(user);
              message.loading({
                content: "Signing in...",
                key: "signIn",
                duration: 1,
                onClose: () => {
                  message.destroy("signIn");
                  message.success({
                    content: "Signed in successfully",
                    key: "signInSuccess",
                    duration: 3,
                    onClose: () => {
                      message.destroy("signInSuccess");
                      navigate("/dashboard");
                    },
                  });
                },
              });
            },
          });
        })
        .catch((error) => {
          message.destroy("verifySignature");
          message.error({
            content: `❌ ${error.message}`,
            key: "verifySignatureError",
          });
        });
    } catch (error) {
      dispatch(setIsLoggedIn(false));
      clearAuthData();
    }
  }

return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        padding: 12,
      }}
    >
      {
        <ConnectButton
          accountStatus={{
            smallScreen: false,
            largeScreen: "full",
          }}
          showBalance={{
            smallScreen: false,
            largeScreen: true,
          }}
          chainStatus={{
            smallScreen: false,
            largeScreen: "full",
          }}
        />
      }
    </div>
  );
}
