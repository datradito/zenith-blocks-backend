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
    try {
        let SIWEObject = new SiweMessage(req.body.message);
        const { data: message } = await SIWEObject.verify({
            signature: req.body.signature,
            nonce: req.session.nonce,
        });

        req.session.siwe = message;
        req.session.cookie.expires = new Date(message.expirationTime);
        req.session.save(() => res.status(200).send(true));
    }
    catch (e) {
        throw e;
    }
};

module.exports = { createSiweMessage, verifySiweMessageHandler };
