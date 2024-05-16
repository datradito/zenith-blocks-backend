import Budget from "../../Database/models/Budget.js";
import setFilters from "./setFilters.js";

const countBudgets = async (filters, daoId) => {
  const whereClause = await setFilters(filters, daoId);

  return await Budget.count({
    where: whereClause,
  });
};

export default countBudgets;
