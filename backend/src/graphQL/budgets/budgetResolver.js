import { GraphQLError } from "graphql";
import Budget from "../../Database/models/Budget.js";
import BudgetHandler from "../../services/budgets/BudgetHandler.js";
import countBudgets from "../../services/budgets/countBudgets.js";
import setFilters from "../../services/budgets/setFilters.js";
const budgetResolver = {
  Query: {
    getBudgetById: async (parent, args) => {
      try {
        const budget = await Budget.findByPk(args.id);
        return { ...budget.toJSON() };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    getBudgetsForProposal: async (parent, args) => {
      try {
        const budgets = await Budget.findAll({
          where: { proposalid: args.proposalid },
        });

        const budgetsWithRemaining = budgets.map(async (budget) => {
          const { amount } = await Budget.findByPk(budget.id, {
            attributes: ["amount"],
          });
          return { ...budget.toJSON(), amount }; // merge the original budget with remaining
        });

        return budgetsWithRemaining;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    getBudgets: async (parent, { first, skip, filters }) => {
      const count = await countBudgets(filters);
      try {
        const whereClause = await setFilters(filters);

        const budgets = await Budget.findAll({
          where: whereClause,
          order: [["createdAt", "DESC"]],
          limit: first || 10,
          offset: skip || 0,
        });
        return { items: budgets, count };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
  Mutation: {
    submitBudget: async (parent, args) => {
      const budgetHandler = new BudgetHandler(args.budget);

      try {
        await budgetHandler.validate();
        await budgetHandler.processProposalStatus();
        await budgetHandler.calcBreakdown();
        return await budgetHandler.submit();
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
};

export default budgetResolver;
