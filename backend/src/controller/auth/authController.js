import User from "../../Database/models/User.js";
import { signJWTToken } from "../../middlewares/auth.js";

const verifySafeUserController = async (req, res) => {
  const { address } = req.body;
  try {
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

    const token = await signJWTToken({
      userAddress: user.address,
      dao: user.daoid,
    });
    return res.status(201).json({ authToken: token });
  } catch (error) {
    return res.status(500).json({
      error: "ServerError",
      message: `An unexpected error occurred. ${error.message}`,
    });
  }
};

export { verifySafeUserController };
