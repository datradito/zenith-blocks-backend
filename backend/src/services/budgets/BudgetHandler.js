import Proposal from "../../Database/models/Proposal.js";
import Invoice from "../../Database/models/Invoice.js";
import Budget from "../../Database/models/Budget.js";
import { validateBudget } from "../../validators/validateBudget.js";
import handleProposalStatusUpdate from "./updateProposalStatus.js";
import { GraphQLError } from "graphql";
import {
  throwCustomError,
  ErrorTypes,
} from "../../errors/errorHandlerHelper.js";

class BudgetHandler {
  constructor(budget) {
    this.budget = budget;
  }

  async validate() {
    const { amount, proposalid } = this.budget;
    const { errors, valid } = await validateBudget(amount, proposalid);

    if (!valid) {
      throwCustomError(errors.amount, ErrorTypes.BAD_USER_INPUT);
    }
    return this;
  }

  //run this everytime new bill is saved to udpate the remaining
  async calcRemaining() {
    const { id } = this.budget;
    if (!id) {
      return this;
    }

    const totalBilled = await Invoice.sum("total", {
      where: {
        budgetid: id,
      },
    });

    if (!totalBilled) {
      this.budget.remaining = this.budget.amount;
      return this;
    }

    this.budget.remaining = this.budget.amount - totalBilled;
    return this;
  }

  async calcBreakdown() {
    const { amount, proposalid } = this.budget;
    if (!proposalid) {
      return this;
    }
    const proposal = await Proposal.findByPk(proposalid, {
      attributes: ["amount"],
    });

    const proposalAmount = proposal.get("amount");

    if (proposalAmount === 0) {
      this.budget.breakdown = 0;
      return this;
    }

    if (amount === 0) {
      this.budget.breakdown = 0;
      return this;
    }

    this.budget.breakdown = (amount / proposalAmount) * 100;
    return this;
  }

  async processProposalStatus() {
    const { proposalid, amount } = this.budget;
    if (!proposalid) {
      return this;
    }
    await handleProposalStatusUpdate(proposalid, amount);
    return this;
  }

  async submit() {
    const budget = new Budget({
      ...this.budget,
      remaining: this.budget.amount,
    });

    try {
      return await budget.save();
    } catch (error) {
      throw new GraphQLError(error.message);
    }
  }
}

export default BudgetHandler;
