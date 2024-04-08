export const transformBudgets = (items) => {
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
