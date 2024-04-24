import Budget from "../../Database/models/Budget.js";
import setFilters from "./setFilters.js";

const countBudgets = async (filters) => {
  const whereClause = await setFilters(filters);

  return await Budget.count({
    where: whereClause,
  });
};

export default countBudgets;
