import { GET_ALL_BUDGETS_FOR_PROPOSAL } from "../../../ServerQueries/Budget/Queries";
import { useQuery } from "@tanstack/react-query";
import { client } from "../../../apolloConfig/client.js";
import { useState } from "react";
import { transformBudgets } from "../../../Services/BudgetServices/budgetService";
import { toast } from "react-toastify";

export const useGetBudgets = (proposalId, amount) => {
  const [budgets, setBudgets] = useState([]);

  const { isLoading, error, refetch } = useQuery(
    ["budgets", proposalId],
    async () => {
      const response = await client.query({
        query: GET_ALL_BUDGETS_FOR_PROPOSAL,
        variables: { proposalid: proposalId },
      });
      return response.data;
    },
    {
      onSuccess: (data) => {
        const transformedBudgets = transformBudgets(
          data.getBudgetsForProposal,
          amount
        );
        setBudgets(transformedBudgets);
        },
        onError: (error) => {
            //implement apollo service to decode graphql errors and log those
            toast.error("Failed to fetch budgets");
        }
        
    }
  );

  return { isLoading, error, budgets, refetch };
};
