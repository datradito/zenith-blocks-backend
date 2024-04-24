import { Sequelize } from "sequelize";

const setFilters = async (filters) => {
  const whereClause = { ...filters };
  if (filters) {
    if (filters.proposal_id) {
      whereClause.proposalid = filters.proposal_id;
    }
    if (filters.creation_date__gte && filters.creation_date__lte) {
      whereClause.createdAt = {
        [Sequelize.Op.between]: [
          new Date(filters.creation_date__gte),
          new Date(filters.creation_date__lte),
        ],
      };
    }
    if (filters.amount) {
      whereClause.amount = {
        [Sequelize.Op.gte]: filters.amount.min,
        [Sequelize.Op.lte]: filters.amount.max,
      };
    }
    delete whereClause?.proposal_id;
    delete whereClause?.creation_date__gte;
    delete whereClause?.creation_date__lte;
    delete whereClause?.type;
  }
  return whereClause;
};

export default setFilters;
