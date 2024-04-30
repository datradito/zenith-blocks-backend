import { GraphQLError } from "graphql";
import Category from "../../Database/models/Categories.js";

const categoryResolver = {
  Query: {
    categories: async (_, {}, context) => {
      //
      if (!context.user) {
        throw new Error("Unauthorized");
      }
      return Category.findAll({
        where: { daoid: context.user.daoId },
      });
    },
  },
  Mutation: {
    createCategory: async (_, { label }, context) => {
      if (!context.user) {
        throw new Error("Unauthorized");
      }

      const existing = await Category.findOne({
        where: {
          label: label,
          daoid: context.user.daoId,
        },
      });
      if (existing) {
        throw new Error("Category already exists");
      }
      try {
        const category = await Category.create({
          label: label,
          daoid: context.user.daoId,
        });
        return category;
      } catch (error) {
        throw new GraphQLError(error);
      }
    },
  },
};

export default categoryResolver;
