import React, { useEffect, useState } from 'react'
import User from '../../pages/Swap/user';
import RecentTransactions from '../../molecules/Wallet/RecentTransactions';
import {
    useAccount,
    useConnect,
    useDisconnect,
    useEnsAvatar,
    useEnsName,
    useBalance
} from 'wagmi'


import MyContract from "../../../contracts/MyContract.json";
// import { Mainnet,useEtherBalance, useEthers } from '@usedapp/core'
// import { formatEther } from '@ethersproject/units';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useNavigate } from 'react-router-dom';


export default function WalletConnect() {
    const navigate = useNavigate()
    const { address, connector, isConnected } = useAccount()
    const { data: ensAvatar } = useEnsAvatar({ address })
    const { data: ensName } = useEnsName({ address })
    const { data, isError, isLoading } = useBalance({
        address
    })

    const [isAllowed, setIsAllowed] = useState(false);

    // const [state, setState] = useState({
    //     web3: null,
    //     contract: null,
    // });

    //navigate user to /swap page if connected
    useEffect(() => {
        if (isConnected) {
            navigate('/swap')
        }
    }, [isConnected])


    // useEffect(() => {
    //     const provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");
    //     async function template() {
    //         // const web3 = new Web3(provider);
    //         // const networkId = await web3.eth.net.getId();
    //         // const deployedNetwork = MyContract.networks[networkId];
    //         const contract = new web3.eth.Contract(
    //             MyContract.abi,
    //             deployedNetwork.address
    //         );
    //         setState({ web3: web3, contract: contract });
    //     }
    //     provider && template();
    // }, [])

    // useEffect(() => {
    //     // async function isUserAllowed() {
    //     //     // const { contract } = state;
    //     //     //manually allow users by default for now - need to come up with a better solution
    //     //     allowUser();
    //     //     //  const allowed = await contract.methods.isUserAllowed().call();
    //     //     //     setIsAllowed(allowed);
    //     //     //     console.log(allowed);
    //     //     //  localStorage.setItem({`User: ${userAddress, "isAllowed: ${isAllowed}"}`})
    //     // }
    //     // isUserAllowed();
    //     allowUser();
    //     //address && isUserAllowed();
    // }, [address]);


    // const connectWallet = async () => {
    //     if (window.ethereum) {
    //         try {
    //             // request the user's Ethereum account address
    //             const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    //             setUserAddress(accounts[0]);
    //             console.log(isAllowed);
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     }
    // }

    const allowUser = async () => {
        console.log(address)
        if (address) {
            // const { contract } = state;
            //await contract.methods.setAddress().send({ from: address });
            // const addresses = contract.methods.getAddresses().call();
            // addresses.then((result) => {
            //     console.log(result);
            // })
        }
    }

    // User click on connect button -> connects to wallet -> we retrieve user addresses master file ipfs address from smart contract -> we retrieve master file from ipfs -> if user address belongs to particular dao in file then allow otherwise deny

    // which means file should be structured as follows:
    // { customers : [{
    //     "dao-1" : {
    //         "addresses" : {
    //             "address" : {
    //              "isAllowed" : "true"
    //              }
    //         },
    //       "appendPreviousFileipfsAddress" : "ipfs://ipfs-hash"
    //     }
    //   }]
    // }
    //  const allowed = await contract.methods.isUserAllowed().call();
    //     setIsAllowed(allowed);
    //     console.log(allowed);
    //  localStorage.setItem({`User: ${userAddress, "isAllowed: ${isAllowed}"}`})
    //address && isUserAllowed();



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
