import { GET_ALL_BUDGETS_FOR_PROPOSAL } from "../../../ServerQueries/Budget/Queries";
import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import { transformBudgets } from "../../../Services/BudgetServices/budgetService";
import { useQuery } from "@apollo/client";

export const useGetBudgets = (amount, proposalId) => {
  const [budgets, setBudgets] = useState([]);

  const { loading: isLoading, error, data, refetch } = useQuery(
    GET_ALL_BUDGETS_FOR_PROPOSAL,
    {
      variables: { proposalid: proposalId },
      errorPolicy: "all",
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
