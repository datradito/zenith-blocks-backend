import { GET_ALL_BUDGETS_FOR_PROPOSAL } from "../../../ServerQueries/Budget/Queries";
import { useQuery } from "@tanstack/react-query";
import { client } from "../../../apolloConfig/client.js";
import { useState, useEffect } from "react";
import { transformBudgets } from "../../../Services/BudgetServices/budgetService";
import { toast } from "react-hot-toast";

export const useGetBudgets = (amount, proposalId) => {
  const [budgets, setBudgets] = useState([]);

const { isLoading, error, refetch, data } = useQuery(
  ["budgetList", proposalId],
  async () => {
    const response = await client.query({
      query: GET_ALL_BUDGETS_FOR_PROPOSAL,
      variables: { proposalid: proposalId },
      errorPolicy: "all",
    });
    return response.data;
  }
);

useEffect(() => {
  if (data) {
    const transformedBudgets = transformBudgets(
      data.getBudgetsForProposal,
      amount
    );
    setBudgets(transformedBudgets);
  }
}, [data]);

useEffect(() => {
  if (error) {
    toast.error(error.message);
  }
}, [error]);

  return { isLoading, error, budgets, refetch };
};
