import { useQuery } from "@apollo/client";
import { GET_REMAINING_BUDGET_AMOUNT } from "../../../model/budget/query";

export const useGetRemainingBudgetAmount = (budgetId) => {
  const { data, loading, error } = useQuery(GET_REMAINING_BUDGET_AMOUNT, {
    variables: { budgetid: budgetId },
    errorPolicy: "all",
  });

  return { data, loading, error };
};
