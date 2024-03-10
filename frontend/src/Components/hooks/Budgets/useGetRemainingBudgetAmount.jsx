const { useQuery } = require("@apollo/client");
const { GET_REMAINING_BUDGET_AMOUNT } = require("../../../model/budget/query");

export const useGetRemainingBudgetAmount = (budgetId) => {
  const { data, loading, error } = useQuery(GET_REMAINING_BUDGET_AMOUNT, {
    variables: { budgetid: budgetId },
    errorPolicy: "all",
  });

  return { data, loading, error };
};
