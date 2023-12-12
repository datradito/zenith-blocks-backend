const User = require("../Database/models/User");
const { signJWTToken } = require("../utility/middlewares/auth");
const siwe = require("siwe");
const { createSiweMessage } = require("../utility/signMessage");


//first request to backend - initiate session and store the address to session from frontend
async function siweController(req, res) {
  const { address, network, nonce } = req.body;
  try {
    const message = createSiweMessage(address, network, nonce);

    req.session.nonce = nonce;
    req.session.address = address;
    req.session.save();
    console.log(req.sessionID);
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//second request to backend - verify the signature, find the adress from previous request that was store din session 
async function verifyController(req, res) {
  console.log(req.sessionID);
    try {
        if (!req.body.message || !req.body.signature) {
        return res.status(400).json({
            message: "Expected message and signature in the request body.",
        });
        }

        if (!req.session.address) {
          return res.status(400).json({
              message: "Expected address in the session.",
          });
        }

    const SIWEObject = new siwe.SiweMessage(req.body.message);
    const { data: message } = await SIWEObject.verify({
      signature: req.body.signature,
      nonce: req.session.nonce,
    });

    const user = await User.findOne({
      where: { address: req.session.address },
    });

    if (!user) {
      res.status(404).json("User not found");
    }

    const token = signJWTToken({
      userAddress: user.address,
      dao: user.daoId,
    });

    return res.status(201).json({ authToken: token });
    } catch (e) {
      res.status(500).json(e);
  }
}

module.exports = {
    siweController,
    verifyController
}