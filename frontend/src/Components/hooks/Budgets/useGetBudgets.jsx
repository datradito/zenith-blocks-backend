import { GET_ALL_BUDGETS_FOR_PROPOSAL } from "../../../model/budget/query";
import { useState, useEffect } from "react";
import { transformBudgets } from "../../../Services/BudgetServices/budgetService";
import { useQuery } from "@apollo/client";
import { message } from "antd";

export const useGetBudgets = ( proposalId) => {
  const [budgets, setBudgets] = useState([]);

  const {
    loading: isLoading,
    error,
    data,
    refetch,
  } = useQuery(GET_ALL_BUDGETS_FOR_PROPOSAL, {
    variables: { proposalid: proposalId },
  });

  useEffect(() => {
    if (data) {
      const transformedBudgets = transformBudgets(
        data.getBudgetsForProposal
      );
      setBudgets(transformedBudgets);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      message.error("Error fetching budgets");
    }
  }, [error]);

  return { isLoading, error, budgets, refetch };
};
