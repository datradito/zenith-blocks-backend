const siwe = require('siwe');
require('dotenv').config();

const domain = "localhost:3000";
const origin = "http://localhost:3000";
const redirect = "http://localhost:3000/proposals";

const config = {
    domain: process.env.DOMAIN || domain,
    statement: process.env.STATEMENT || "Siwe Quickstart",
    origin: process.env.DEV_ORIGIN || origin,
    uri: process.env.DEV_URI,
};

const createNonce = async () => {
    return await siwe.generateNonce();
}

function createSiweMessage(address, network, nonce) {
    try {
        const siweMessage = new siwe.SiweMessage({
            address,
            network,
            chainId: "1",
            version: '1',
            nonce: nonce,
            ...config,
        });
        return siweMessage.prepareMessage();
    }catch (error) {
        return(error);
    }
}


const verifySiweMessageHandler = async(message, signature, nonce) => {
    let SIWEObject = new siwe.SiweMessage(message);

    return SIWEObject.verify({ signature: signature, nonce: nonce })
        .then((data) => {
            return data;
        })
        .catch((error) => {
            if (error instanceof siwe.SiweError) {
                console.log(error.code);
                console.log(error.message);
                console.log(error.data);
            }
            // Handle other errors if needed
            throw error; // Rethrow the error so that the caller can handle it
        });
};


module.exports = { createSiweMessage, createNonce, verifySiweMessageHandler };