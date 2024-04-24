import DataLoader from "dataloader";
import { Sequelize } from "sequelize";
import Budget from "../../Database/models/Budget.js";

const budgetLoader = new DataLoader(async (ids) => {
  const budgets = await Budget.findAll({
    where: { proposalid: { [Sequelize.Op.in]: ids } },
  });

  return ids.map((id) => {
    const budgetsForId = budgets.filter((budget) => budget.proposalid === id);
    return budgetsForId.length ? budgetsForId : null;
  });
});

export default budgetLoader;
