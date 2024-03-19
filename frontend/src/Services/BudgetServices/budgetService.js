import { message } from "antd";

export const transformBudgets = (items, totalBudget) => {
if (items === null || items === undefined || (Array.isArray(items) && items[0] === null)) return null;

  items = items.map((item) => {
    const { action, remaining, __typename, ...rest } = item;
    return {
      ...rest,
      remaining: item.remaining,
      Invoices: "INVOICE",
    };
  });
  return items?.length > 0 ? items : null;
};

export const validateBudget = (item, proposalAmount) => {
  if (
    item.category === "" ||
    item.amount === "" ||
    item.currency === "" ||
    item.breakdown === ""
  ) {
    message.error("All fields are required");
    return false;
  }

  if (parseInt(item.amount) > parseInt(proposalAmount)) {
   message.error("Budget amount cannot be greater than proposal amount");
    return false;
  }

  return true;
};
