import User from "../../Database/models/User.js";
import { GraphQLError } from "graphql";

const userResolver = {
  Query: {
    currentUser: async (_, args, context) => {
      if (!context.user) {
        throw new Error("Unauthorized");
      }

      try {
        return await User.findOne({ where: { address: context.user.address } });
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
    updateNotificationSetting: async (_, { id, value }, context) => {
      try {
        const user = await User.findOne({
          where: { address: context.user.address },
        });
        if (id === "telegram") {
          user.telegramid = value;
        } else if (id === "discord") {
          user.discordid = value;
        }
        await user.save();
        return user;
      } catch (error) {
        throw new GraphQLError(error);
      }
    },
    updateNotificationStatus: async (_, { id, status }, context) => {
      try {
        const user = await User.findOne({
          where: { address: context.user.address },
        });

        if (!user) {
          throw new Error("User not found or not authorized");
        }

        const settingsStatus = { ...user.notificationSettings };

        settingsStatus[id] = status;
        user.notificationSettings = settingsStatus;
        await user.save();
        return user;
      } catch (error) {
        throw new GraphQLError(error);
      }
    },
  },
};

export default userResolver;
