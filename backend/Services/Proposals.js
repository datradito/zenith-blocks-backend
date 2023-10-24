const Budget = require("../Database/models/Budget");
const Proposal = require("../Database/models/Proposal");

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

module.exports = {
  getRemainingProposalAmount,
};
