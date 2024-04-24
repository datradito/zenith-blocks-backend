import DataLoader from "dataloader";
import Proposal from "../../Database/models/Proposal.js";

const proposalLoader = new DataLoader(async (ids) => {
  const proposals = await Proposal.findAll({
    where: {
      id: {
        [Sequelize.Op.in]: ids,
      },
    },
  });

  const proposalById = proposals.reduce((acc, proposal) => {
    acc[proposal.id] = proposal;
    return acc;
  }, {});
  return ids.map((id) => proposalById[id]);
});

export default proposalLoader;
