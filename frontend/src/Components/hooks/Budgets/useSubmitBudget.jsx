import { useParams } from 'react-router-dom';
import { SUBMIT_BUDGET_MUTATION } from '../../../ServerQueries/Budget/Mutation';
import { client } from '../../../apolloConfig/client';
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from 'react-toastify';


const useSubmitBudget = () => {
    const queryClient = useQueryClient();
    const proposalId = useParams().proposalId;
    const navigate = useNavigate();
    const key = ["budgets", proposalId];

    const { mutate: submitBudget, isLoading: isSubmitting } = useMutation({
        mutationFn: async (budgetData) => {
            await client.mutate({
              mutation: SUBMIT_BUDGET_MUTATION,
              variables: {
                budget: budgetData,
              },
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: key,
            });
            toast.success("Budget created successfully");
            navigate(`/proposals/${proposalId}`);
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });

    return { isSubmitting, submitBudget };
};

export default useSubmitBudget;
