const { GraphQLError } = require("graphql");
const Invoice = require("../../Database/models/Invoice");
const Budget = require("../../Database/models/Budget");
const validateBudget = require("../../validators/validateBudget");
const updateProposalStatus = require("../../utility/budgetHelpers/updateProposalStatus");
const {
  throwCustomError,
  ErrorTypes,
} = require("../../utility//errorHandlerHelpers/errorHandlerHelper");

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

        const budgetsWithRemaining = budgets.map((budget) => {
          const remaining = budget.remaining;
          console.log(remaining);
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
        const budget = await Budget.findByPk(args.budgetid);
        const invoices = await Invoice.findAll({
          where: { budgetid: args.budgetid },
        });
        let totalInvoiceAmount = 0;
        invoices.forEach((invoice) => {
          totalInvoiceAmount += invoice.total;
        });
        return budget.amount - totalInvoiceAmount;
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

module.exports = budgetResolver;
