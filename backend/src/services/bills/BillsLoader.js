import DataLoader from "dataloader";
import { Sequelize } from "sequelize";
import Invoice from "../../Database/models/Invoice.js";

const billLoader = new DataLoader(async (ids) => {
  const invoices = await Invoice.findAll({
    where: {
      budgetid: {
        [Sequelize.Op.in]: ids,
      },
    }
  });
  // map invoices to ids
  return ids.map((id) => {
    const invoice = invoices.filter((invoice) => invoice.budgetid === id);
    return invoice ? invoice : null;
  });
});
export default billLoader;
