import User from "../../Database/models/User.js";
import { GraphQLError } from "graphql";

const userResolver = {
  Query: {
    user: async (_, { address }, context) => {
      if (!context.user) {
        throw new Error("Unauthorized");
      }

      try {
        return await User.findOne({ where: { address } });
      } catch (error) {
        throw new GraphQLError(error);
      }
    },
  },
  Mutation: {
    createUser: async (_, { input }, context) => {

      try {
        const user = await User.create(input);
        return user;
      } catch (error) {
        throw new GraphQLError(error);
      }
    },
  },
};

export default userResolver;
