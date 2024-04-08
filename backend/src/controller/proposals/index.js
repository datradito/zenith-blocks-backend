
import Budget from "../../Database/models/Budget.js";
import Proposal from "../../Database/models/Proposal.js";

const getRemainingProposalAmount = async (id) => {
  const budget = await Budget.sum("amount", {
    where: {
      proposalid: id,
    },
  });

  const proposal = await Proposal.findByPk(id);

  if (!proposal) {
    throw new GraphQLError("Proposal not found");
  }

  if (budget === null) {
    return parseInt(proposal.amount);
  }
  return parseInt(proposal.amount) - parseInt(budget);
};

export { getRemainingProposalAmount };
