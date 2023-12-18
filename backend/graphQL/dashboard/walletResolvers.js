import { GraphQLError } from "graphql";
// const { generateAxiosConfig, getTokenBalances } = require("../../utility/alchemyUtil/tokenConfig");

const walletResolvers = {
  Query: {
    getTokenBalances: async (_, { address }) => {
      try {
        const { config } = generateAxiosConfig(address)
        const data = await getTokenBalances(config);
        return data;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  }
};

export default walletResolvers;