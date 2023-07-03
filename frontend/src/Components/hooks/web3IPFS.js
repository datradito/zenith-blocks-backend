import { useState, useEffect } from 'react';
import Web3 from 'web3';
import IPFSContract from '../../../src/contracts/IPFSContract.json';

const useWeb3IpfsContract = () => {
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);

    useEffect(() => {
        const initWeb3 = async () => {
            try {
                // Check if Web3 provider is available
                    // Create Web3 instance
                const provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");
                    // await window.ethereum.enable(); // Request user permission
                const web3 = new Web3(provider);
                    // Set Web3 instance

                    // Get network ID
                const networkId = await web3.eth.net.getId();
                const deployedNetwork = IPFSContract.networks[networkId];
                const contract = new web3.eth.Contract(
                    IPFSContract.abi,
                    deployedNetwork.address
                );

                    // Set contract instance
                setContract(contract);
                setWeb3(web3);
            } catch (error) {
                console.error('Error initializing Web3:', error);
            }
        };

        initWeb3();
    }, []);

    return { web3, contract };
};

export default useWeb3IpfsContract;
