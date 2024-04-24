import Budget from "../Database/models/Budget.js";
import Proposal from "../Database/models/Proposal.js";
import { GraphQLError } from "graphql";

const validateBudget = async (amount, proposalid) => {
  const errors = {};

  if (!proposalid) {
    throw new GraphQLError("Proposal is required", {
      extensions: { code: "PROPOSAL_REQUIRED" },
    });
  }

  const proposal = await Proposal.findByPk(proposalid, {
    attributes: ["amount"],
  });

  if (!proposal) {
    throw new Error(
      `Please make sure to assign amount to proposal before budgeting`
    );
  }

  let totalBudgetedAmount = await Budget.sum("amount", {
    where: {
      proposalid: proposalid,
    },
  });

  if (!totalBudgetedAmount) {
    totalBudgetedAmount = 0;
  }

  const proposalAmount = proposal.get("amount");

  if (parseInt(proposalAmount) - parseInt(totalBudgetedAmount) === 0) {
    errors.amount = `Proposal amount has been fully budgeted`;
  } else if (
    parseInt(amount) >
    parseInt(proposalAmount) - parseInt(totalBudgetedAmount)
  ) {
    errors.amount = `Budget amount cannot exceed remaining proposal amount of ${
      parseInt(proposalAmount) - parseInt(totalBudgetedAmount)
    }`;
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

export { validateBudget };
