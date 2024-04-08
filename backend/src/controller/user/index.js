import User from "../../Database/models/User";

export const createUser = async (req, res) => {
  const { address, daoId } = req.body;
  const user = await User.create({ address, daoId });
  return res.status(200).json(user);
};
