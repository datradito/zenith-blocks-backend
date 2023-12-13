const { generateNonce, SiweMessage, SiweError }  = require("siwe");
require("dotenv").config();

const domain = "localhost:3000";
const origin = "http://localhost:3000";
const redirect = "http://localhost:3000/proposals";

const config = {
  domain: process.env.DOMAIN || domain,
  statement: process.env.STATEMENT || "Siwe Quickstart",
  origin: process.env.DEV_ORIGIN || origin,
  uri: process.env.DEV_URI || "http://localhost:3000",
};

function createSiweMessage(address, network, nonce) {
  try {
    const siweMessage = new SiweMessage({
      address,
      network,
      chainId: "1",
      version: "1",
      nonce,
      ...config,
    });
    return siweMessage.prepareMessage();
  } catch (error) {
    throw error;
  }
}

const verifySiweMessageHandler = async (message, signature, nonce) => {
  let SIWEObject = new SiweMessage(message);

  return SIWEObject.verify({ signature: signature, nonce: nonce })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      if (error instanceof SiweError) {
        console.log(error.code);
        console.log(error.message);
        console.log(error.data);
      }
      // Handle other errors if needed
      throw error; // Rethrow the error so that the caller can handle it
    });
};

module.exports = { createSiweMessage, verifySiweMessageHandler };
