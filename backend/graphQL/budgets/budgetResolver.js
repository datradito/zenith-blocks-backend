import { GraphQLError } from "graphql";
import Budget from "../../Database/models/Budget.js";
import Invoice from "../../Database/models/Invoice.js";

import {
  validateBudget,
} from "../../validators/validateBudget.js";
import  updateProposalStatus  from "../../utility/budgetHelpers/updateProposalStatus.js";
import { getRemainingBudgetAmount } from "../../Services/Budgets.js";

// const {
//   throwCustomError,
//   ErrorTypes,
// } = require("../../utility//errorHandlerHelpers/errorHandlerHelper");
import {
  throwCustomError,
  ErrorTypes,
} from "../../utility/errorHandlerHelpers/errorHandlerHelper.js";

const budgetResolver = {
  Query: {
    getBudgetById: async (parent, args) => {
      try {
        const budget = await Budget.findByPk(args.id);
        return { ...budget.toJSON(), remaining: budget.remaining };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    getBudgetsForProposal: async (parent, args) => {
      try {
        const budgets = await Budget.findAll({
          where: { proposalid: args.proposalid },
          include: [
            {
              model: Invoice,
            },
          ],
        });

        const budgetsWithRemaining = budgets.map(async (budget) => {
          
          const remaining = await getRemainingBudgetAmount(budget.id);
          return { ...budget.toJSON(), remaining }; // merge the original budget with remaining
        });

        // if (budgetsWithRemaining.length === 0) {
        //   throw new GraphQLError("No budgets found for this proposal");
        // }
        return budgetsWithRemaining;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    getRemainingBudgetAmount: async (parent, args) => {
      //using the budgetid, get the remaining budget amount by budgetTotal - all invoice total for this budget based on args.budgetid
      try {
        return await getRemainingBudgetAmount(args.budgetid);
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
  Mutation: {
    submitBudget: async (parent, args) => {
      const { amount, proposalid } = args.budget;

      const { errors, valid } = await validateBudget(amount, proposalid);

      if (!valid) {
        throwCustomError(errors.amount, ErrorTypes.BAD_USER_INPUT);
      }

      let ipfsResponse;

      // Upload data to IPFS
      // const response = await UploadDataToIpfs(args.rootpath, JSON.stringify(args));
      // ipfsResponse = response.jsonResponse[0].path;

      // We'll simulate the response for demonstration purposes
      ipfsResponse = "sample-ipfs-response-path";

      await updateProposalStatus(args.budget.proposalid, args.budget.amount);

      const budget = new Budget({
        ...args.budget,
        ipfs: ipfsResponse
          ? ipfsResponse
          : `Failed to upload to IPFS at ${new Date().toISOString()}`,
      });

      try {
        return await budget.save();
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
};

export default budgetResolver;
