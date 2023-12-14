const User = require("../Database/models/User");
const { signJWTToken } = require("../utility/middlewares/auth");
const { SiweMessage } = require("siwe");
const { createSiweMessage } = require("../utility/signMessage");


// second request to backend - verify the signature, find the address from the previous request that was stored in session 
async function verifyController(req, res) {
  const { message, signature } = req.body;
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

    const address = verified.data.address;

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
