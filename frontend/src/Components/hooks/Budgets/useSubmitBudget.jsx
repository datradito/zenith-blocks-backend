import { useParams } from 'react-router-dom';
import { SUBMIT_BUDGET_MUTATION } from '../../../ServerQueries/Budget/Mutation';
import { client } from '../../../apolloConfig/client';
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

async function submitBudgetData(budgetData) {
  await client.mutate({
    mutation: SUBMIT_BUDGET_MUTATION,
    variables: { budget: budgetData },
  },
  {
    errorPolicy: "all",
  }
  );
}

export const useSubmitBudget = () => {
    const queryClient = useQueryClient();
    const proposalId = useParams().proposalId;
    const navigate = useNavigate();
    const { mutate: submitBudget, isLoading: isSubmitting } = useMutation(submitBudgetData, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["budgetList", proposalId],
        });
        toast.success("Budget created successfully");
        navigate(`/proposals/${proposalId}/budgets`);
      }
    });

    return { isSubmitting, submitBudget };
};

