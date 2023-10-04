import { toast } from "react-toastify";

export const transformBudgets = (items, totalBudget) => {
  if (items === null || items === undefined) return null;

  items = items.map((item) => {
    const { action, breakdown, remaining, __typename, ...rest } = item;
    // const data = { ...rest, Breakdown: (parseInt(item.amount) / parseInt(totalBudget)) * 100, Remaining: parseInt(totalBudget - parseInt(item.amount))  , Invoices: 'INVOICE' };
    return {
      ...rest,
      Breakdown: (parseInt(item.amount) / parseInt(totalBudget)) * 100,
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
    toast.error("Please fill out all fields");
    return false;
  }

  if (parseInt(item.amount) > parseInt(proposalAmount)) {
    toast.error("Budget amount cannot be greater than proposal amount");
    return false;
  }

  return true;
};

export const prepareBudgetDataForSubmission = (item, proposalId) => {
  if (item === null || item === undefined) return null;

  const { id, remaining, ...rest } = item;
  
  return {
    ...rest,
    proposalid: proposalId,
    rootpath: proposalId,
    amount: parseInt(rest.amount),
    breakdown: parseInt(rest.breakdown),
  };
};


