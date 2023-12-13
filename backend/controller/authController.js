const User = require("../Database/models/User");
const { signJWTToken } = require("../utility/middlewares/auth");
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
    if (!req.body.message) {
      res
        .status(422)
        .json({ message: "Expected prepareMessage object as body." });
      return;
    }

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
      req.session.nonce,
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

    res.setHeader(
      "Access-Control-Allow-Origin",
      process.env.FRONTEND_URL,
    );
     res.status(201).json({ authToken: token });

  } catch (e) {
    console.error("Error in verifyController:", e.message);
    req.session.siwe = null;
    req.session.nonce = null;

    switch (e) {
      case ErrorTypes.EXPIRED_MESSAGE: {
        req.session.save(() => res.status(440).json({ message: e.message }));
        break;
      }
      case ErrorTypes.INVALID_SIGNATURE: {
        req.session.save(() => res.status(422).json({ message: e.message }));
        break;
      }
      default: {
        req.session.save(() => res.status(500).json({ message: e.message }));
        break;
      }
    }
  }
}


module.exports = {
    siweController,
    verifyController
}