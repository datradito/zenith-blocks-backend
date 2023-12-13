const User = require("../Database/models/User");
const { signJWTToken } = require("../utility/middlewares/auth");
import { generateNonce, SiweMessage } from "siwe";
const { createSiweMessage, verifySiweMessageHandler } = require("../utility/signMessage");


//first request to backend - initiate session and store the address to session from frontend
async function siweController(req, res) {
  const { address, network, nonce } = req.body;
  try {
    const message = createSiweMessage(address, network, nonce);

    req.session.nonce = nonce;
    req.session.address = address;
    req.session.save();

    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//second request to backend - verify the signature, find the adress from previous request that was store din session 
async function verifyController(req, res) {
  const { message, signature } = req.body;
  try {
    if (!req.body.message || !req.body.signature) {
      return res.status(400).json({
        error: "BadRequest",
        message: "Expected message and signature in the request body.",
      });
    }

    if (!req.session.address) {
      return res.status(400).json({
        error: "BadRequest",
        message: "Expected address in the session.",
      });
    }

    await verifySiweMessageHandler(
      message,
      signature,
      req.session.nonce
    );

    const user = await User.findOne({
      where: { address: req.session.address },
    });

    if (!user) {
      return res.status(404).json({
        error: "NotFound",
        message: "User not found",
      });
    }

    const token = signJWTToken({
      userAddress: user.address,
      dao: user.daoId,
    });

    return res.status(201).json({ authToken: token });
  } catch (e) {
    console.error("Error in verifyController:", e);
    return res.status(500).json({
      error: "ServerError",
      message: "An unexpected error occurred.",
    });
  }
}


module.exports = {
    siweController,
    verifyController
}