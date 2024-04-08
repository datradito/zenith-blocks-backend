import React from "react";
import axios from "axios";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useNavigate } from "react-router-dom";
import { useSignMessage, useDisconnect, useAccountEffect } from "wagmi";

import { SiweMessage } from "siwe";
import { message } from "antd";
import useAuthStore from "../../../store/modules/auth/index.ts";

export default function WalletConnect() {
  const { signMessageAsync } = useSignMessage();
  const { disconnect } = useDisconnect();
  const navigate = useNavigate();
  const { login, logout, isAuthenticated } = useAuthStore();

  useAccountEffect({
    onConnect(data) {
      !isAuthenticated && signInWithEthereum(data);
    },
    onDisconnect() {
      navigate("/login");
      logout();
    },
  });

  const createSiweMessage = async (address, chainId) => {
    try {
      const { data: nonce } = await axios.get(
        `${process.env.REACT_APP_AUTH_SERVICE}/nonce`,
        {
          withCredentials: true,
        }
      );


      const data = new SiweMessage({
        domain: window.location.host,
        address: address,
        statement: "Sign in with Ethereum to the zenith.",
        uri: window.location.origin,
        version: "1",
        chainId: chainId,
        nonce: nonce,
      });

      return data.prepareMessage();
    } catch (error) {
      throw error;
    }
  };

  const sendForVerification = async (messageToVerify, signature) => {
    try {
      message.loading({
        content: "Verifying signature...",
        key: "verifyingSignature",
      });
      
      const response = await axios.post(
        `${process.env.REACT_APP_AUTH_SERVICE}/verify`,
        JSON.stringify({ message: messageToVerify, signature }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      message.destroy("verifyingSignature");

      message.success({
        content: "Signature verified successfully",
        key: "verifySignatureSuccess",
        duration: 1,
      });
      return response.data;
    } catch (error) {
      message.destroy("verifyingSignature");
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
            },
          });
        },
      });


      const response = await sendForVerification(siweMessage, signature);
      login(response.authToken);
      navigate("/dashboard");
    } catch (error) {
      const errMessage = error?.errors[0];
      message.error({
        content: `❌ ${errMessage.message} || Something went wronf during login. Please try again.`,
        key: "verifySignatureError",
      });
      logout();
      disconnect();
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
