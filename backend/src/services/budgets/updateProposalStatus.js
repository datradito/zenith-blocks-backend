import Budget from "../../Database/models/Budget.js";
import Proposal from "../../Database/models/Proposal.js";
import { PROPOSAL_STATUS } from "../../utility/constants/ProposalStatuses.js";

const handleProposalStatusUpdate = async (proposalId, currentBudgetAmount) => {
  const budget = await Budget.sum("amount", {
    where: {
      proposalid: proposalId,
    },
  });

  const proposal = await Proposal.findByPk(proposalId, {
    attributes: ["amount"],
  });

  const proposalAmount = proposal.get("amount");
  const budgetedAmount =
    parseInt(currentBudgetAmount) + parseInt(budget || "0");

  if (parseInt(budgetedAmount) === parseInt(proposalAmount)) {
    try {
      const proposal = await Proposal.findByPk(proposalId);
      proposal.status = PROPOSAL_STATUS.PAID;
      await proposal.save();
    } catch (error) {
      throw new UserInputError(
        "BudgetErrors : Unable to update proposal status",
        error
      );
    }
  }
};

export default handleProposalStatusUpdate;
