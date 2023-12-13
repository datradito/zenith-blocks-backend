const User = require("../Database/models/User");
const { signJWTToken } = require("../utility/middlewares/auth");
const { SiweMessage, SiweError } = require("siwe");
const { createSiweMessage, verifySiweMessageHandler } = require("../utility/signMessage");

// first request to backend - initiate session and store the address to session from frontend
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

// second request to backend - verify the signature, find the address from the previous request that was stored in session 
async function verifyController(req, res) {
  const { message, signature, address } = req.body;
  try {
    if (!message || !signature) {
      return res.status(400).json({
        error: "BadRequest",
        message: "Expected message and signature in the request body.",
      });
    }

    // await verifySiweMessageHandler(message, signature, req.session.nonce);
    const SIWEObject = new SiweMessage(message);
    const verified = await SIWEObject.verify({ signature: signature });

    if (!verified) {
      return res.status(400).json({
        error: "BadRequest",
        message: "Signature verification failed.",
      });
    }

      if (!address) {
        return res.status(400).json({
          error: "BadRequest",
          message: "Expected address",
        });
      }

    const user = await User.findOne({
      where: { address: address },
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

    req.session.siwe = verified;

    return res.status(201).json({ authToken: token });
  } catch (error) {
    console.error("Error in verifyController:", error);
    return res.status(500).json({
      error: "ServerError",
      message: `An unexpected error occurred. ${error.message}`,
    });
  }
}

module.exports = {
  siweController,
  verifyController,
};
