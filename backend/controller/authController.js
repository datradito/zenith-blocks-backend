import  User  from "../Database/models/User.js";
import { signJWTToken } from "../utility/middlewares/auth.js";
import { SiweMessage } from "siwe";

// second request to backend - verify the signature, find the address from the previous request that was stored in session 
async function verifyController(req, res) {
  console.time("verifyController");
  const { message, signature } = req.body;
  try {
    console.time("Input validation");
    if (!message || !signature) {
      return res.status(400).json({
        error: "BadRequest",
        message: "Expected message and signature in the request body.",
      });
    }
       console.timeEnd("Input validation");

       console.time("SIWE verification");

    // await verifySiweMessageHandler(message, signature, req.session.nonce);
    const SIWEObject = await new SiweMessage(message);
    const verified = await SIWEObject.verify({ signature: signature });
    console.timeEnd("SIWE verification");
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

    console.time("User lookup");
    const user = await User.findOne({
      where: { address: address },
    });
    console.timeEnd("User lookup");

    if (!user) {
      return res.status(404).json({
        error: "NotFound",
        message: "User not found",
      });
    }

    console.time("Token signing");
    const token = await signJWTToken({
      userAddress: user.address,
      dao: user.daoid,
    });
    console.timeEnd("Token signing");
    req.session.siwe = verified;
        console.timeEnd("verifyController");
    return res.status(201).json({ authToken: token });
  } catch (error) {
    return res.status(500).json({
      error: "ServerError",
      message: `An unexpected error occurred. ${error.message}`,
    });
  }
}

export { verifyController };